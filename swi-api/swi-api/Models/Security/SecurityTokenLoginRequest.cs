using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace swi_api.Models.Security
{
    public class SecurityTokenLoginRequest
    {
        public string username { get; set; }
        public string password { get; set; }
        public string clientName { get; set; }
    }
}