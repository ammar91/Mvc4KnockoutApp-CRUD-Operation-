using System.IO;
using System.Net;
using System.Web.Hosting;
using Mvc4KnockoutApp.Helpers;
using Mvc4KnockoutApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace Mvc4KnockoutApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        [HttpPost]
        public JsonResult SaveContact(Contact newContact)
        {
            try
            {
                var contacts = ContactJsonDeserializer.Deserialize();
                if (contacts.Count > 0)
                {
                    var highestId = contacts.Max(c => c.id);
                    newContact.id = highestId + 1;
                }
                else
                {
                    newContact.id = 1;
                }
                contacts.Add(newContact);
                ContactJsonWriter.Write(contacts);
                return Json(new { savedContact = newContact, isSucceeded = true });
            }

            catch (Exception ex)
            {
                return Json(new { isSucceeded = false });
            }
        }

        [HttpPut]
        public JsonResult UpdateContact(Contact updatedContact)
        {
            try
            {
                var contacts = ContactJsonDeserializer.Deserialize();

                foreach (var c in contacts)
                {
                    if (c.id == updatedContact.id)
                    {
                        c.orgType = updatedContact.orgType;
                        c.orgName = updatedContact.orgName;
                        c.email = updatedContact.email;
                        c.jobTitle = updatedContact.jobTitle;
                        c.contactName = updatedContact.contactName;
                        c.active = updatedContact.active;
                    }
                }

                ContactJsonWriter.Write(contacts);

                return Json(new { isSucceeded = true });
            }
            catch (Exception ex)
            {
                return Json(new { isSucceeded = false });
            }
        }

        [HttpDelete]
        public JsonResult DeleteContact(Contact contact)
        {
            try
            {
                var contacts = ContactJsonDeserializer.Deserialize();
                var contactToDelete = contacts.SingleOrDefault(c => c.id == contact.id);
                contacts.Remove(contactToDelete);
                ContactJsonWriter.Write(contacts);
                return Json(new { isSucceeded = true });
            }

            catch (Exception ex)
            {
                return Json(new { isSucceeded = false });
            }
        }


        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
