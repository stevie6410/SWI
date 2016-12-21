using swi_api.Models;
using swi_api.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace swi_api.ExtMethods
{
    public static class SWISecurityExtentionMethods
    {

        public static bool IsExpired(this SWISecurityToken token)
        {
            return (DateTime.Compare(token.ExpiresOn, DateTime.Now) < 0) || (token.LoggedOutOn != null);
        }

        public static bool CanRenew(this SWISecurityToken token)
        {
            return
                   (token.RefreshCount < token.SWIClientApp.TokenRefreshLimit) //Has not exceeded the token refreh limit count
                && (DateTime.Compare(DateTime.Now, token.ExpiresOn.AddMinutes(token.SWIClientApp.MaxTokenLifespan)) < 0) //Has not exceeded the max lifetime of a token
                && (!token.IsExpired()); //Not expired
        }

        public static ClientSecurityToken ToClientToken(this SWISecurityToken token)
        {
            return new ClientSecurityToken() { Token = token.Token, ExpiresOn = token.ExpiresOn };
        }
    }
}