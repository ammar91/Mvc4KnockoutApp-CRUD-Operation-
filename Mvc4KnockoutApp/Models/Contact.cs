using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc4KnockoutApp.Models
{
    public class Contact
    {
        public int id { get; set; }
        public string orgType { get; set; }
        public string orgName { get; set; }
        public string contactName { get; set; }
        public string jobTitle { get; set; }
        public string email { get; set; }
        public bool active { get; set; }
    }
}