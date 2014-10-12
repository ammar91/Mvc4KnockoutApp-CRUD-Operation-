using Mvc4KnockoutApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Hosting;

namespace Mvc4KnockoutApp.Helpers
{
    public static class ContactJsonDeserializer
    {
        public static List<Contact> Deserialize()
        {
            var file = HostingEnvironment.MapPath("~/Scripts/datastore.json");
            var client = new WebClient();
            var jsonString = client.DownloadString(file);
            var contacts = JsonConvert.DeserializeObject<List<Contact>>(jsonString);
            return contacts;
        }
    }
}