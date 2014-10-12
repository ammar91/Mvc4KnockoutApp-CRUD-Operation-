using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using Newtonsoft.Json;
using Mvc4KnockoutApp.Models;

namespace Mvc4KnockoutApp.Helpers
{
    public static class ContactJsonWriter
    {
        public static void Write(List<Contact> contacts)
        {
            var file = HostingEnvironment.MapPath("~/Scripts/datastore.json");
            using (var writer = new StreamWriter(file))
            {
                writer.WriteLine(JsonConvert.SerializeObject(contacts));
            }
        }
    }
}