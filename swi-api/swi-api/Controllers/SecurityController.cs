using swi_api.Models;
using swi_api.Models.Security;
using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Description;
using swi_api.ExtMethods;
using System.Web;
using System.ServiceModel.Channels;

namespace swi_api.Controllers
{
    public class SecurityController : ApiController
    {
        private SWIDB db = new SWIDB();

        public SecurityController()
        {

        }

        [HttpPost]
        [Route("api/security/login")]
        [ResponseType(typeof(ClientSecurityToken))]
        public IHttpActionResult Login([FromBody] SecurityTokenLoginRequest request)
        {
            //Check that the client exists
            var client = ValidateClient(request.clientName);
            if (client == null)
            {
                return BadRequest("Client Id is invalid. Please contact your local administrator");
            }

            //Check that the user exists in the app database
            var user = ValidateAppUser(request.username);
            if (user == null)
            {
                return BadRequest("User does not exist in the SWI Users database. Please contact your local administrator");
            }

            //Check that the credentials are valid on the Active Directory
            var validLogin = ValidateDomainCredentials(request.username, request.password);
            if (!validLogin)
            {
                return BadRequest("Login failed to BEAV");
            }

            //Check to see if there is already a valid token in the token store
            var existingToken = GetExistingToken(request.username);
            if (existingToken != null)
            {
                //Refresh the token and send back to the client
                return RefreshToken(new SecurityTokenRequest() { token = existingToken.Token });
            }

            //Generate a new security token
            var token = new SWISecurityToken();
            token.SWIClientApp = client;
            token.IssuedOn = DateTime.Now;
            token.ExpiresOn = DateTime.Now.AddMinutes(client.Timeout);
            token.Timeout = client.Timeout;
            token.SWIUser = user;
            token.Token = Guid.NewGuid();
            token.IPAddress = HttpContext.Current.Request.UserHostAddress;
            token.HostPC = HttpContext.Current.Request.UserHostName;
            db.SWISecurityTokens.Add(token);
            db.SaveChanges();

            return Ok(token.ToClientToken());
        }

        [HttpPost]
        [Route("api/security/logout")]
        public IHttpActionResult Logout([FromBody] SecurityTokenRequest request)
        {
            var token = GetSecurityToken(request.token);
            if (token != null)
            {
                token.LoggedOutOn = DateTime.Now;
                db.SaveChanges();
            }
            return Ok();
        }

        [HttpPost]
        [Route("api/security/refreshtoken")]
        [ResponseType(typeof(ClientSecurityToken))]
        public IHttpActionResult RefreshToken([FromBody] SecurityTokenRequest request)
        {
            //Get the security token from the database
            var securityToken = GetSecurityToken(request.token);
            if (securityToken == null)
            {
                return BadRequest("Could not find security token");
            }

            //Check that the token is still valid and can be renewed
            if (!securityToken.CanRenew())
            {
                return BadRequest("This token cannot be renewed");
            }

            //Update the token
            securityToken.IssuedOn = DateTime.Now;
            securityToken.ExpiresOn = DateTime.Now.AddMinutes(securityToken.Timeout);
            securityToken.RefreshCount++;

            db.SaveChanges();

            return Ok(securityToken.ToClientToken());

        }

        [HttpPost]
        [Route("api/security/validatetoken")]
        [ResponseType(typeof(bool))]
        public IHttpActionResult ValidateToken([FromBody] SecurityTokenRequest request)
        {

            if(request.token == null)
            {
                return BadRequest("No token was provided");
            }

            var securityToken = GetSecurityToken(request.token);
            if (securityToken != null && !securityToken.IsExpired())
            {
                return StatusCode(HttpStatusCode.Accepted);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotAcceptable);
            }
        }

        private SWISecurityToken GetExistingToken(string username)
        {
            var token = db.SWISecurityTokens.Where(x => x.SWIUser.Username == username && x.LoggedOutOn == null).OrderByDescending(x => x.ExpiresOn).FirstOrDefault();
            if (token == null)
            {
                return null;
            }
            var expireCompare = DateTime.Compare(token.ExpiresOn, DateTime.Now);
            if (expireCompare > 0)
            {
                return token;
            }
            return null;
        }

        private SWISecurityToken GetSecurityToken(Guid token)
        {
            return db.SWISecurityTokens.Include("SWIClientApp").Where(x => x.Token == token).FirstOrDefault();
        }

        private SWIUser ValidateAppUser(string username)
        {
            return db.SWIUsers.Where(x => x.Username == username).FirstOrDefault();
        }

        private SWIClientApp ValidateClient(string clientName)
        {
            return db.SWIClientApps.Where(x => x.Name == clientName).FirstOrDefault();
        }

        private bool ValidateDomainCredentials(string username, string password)
        {
            using (PrincipalContext pc = new PrincipalContext(ContextType.Domain, "BEAV"))
            {
                //validate the credentials
                bool isValid = pc.ValidateCredentials(username, password);
                return isValid;
            }
        }


    }
}
