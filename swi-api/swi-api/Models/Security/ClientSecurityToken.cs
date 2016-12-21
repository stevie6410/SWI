using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace swi_api.Models.Security
{
    public class ClientSecurityToken
    {
        public Guid Token { get; set; }
        public DateTime ExpiresOn { get; set; }
    }
}