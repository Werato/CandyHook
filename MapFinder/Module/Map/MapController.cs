using Database;
using MapFinder.App_Code;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MapFinder.Module.Map
{
    public class MapController : Controller
    {
        [HttpPost]
        public string GetUsers()
        {
            using (var db = new DbWorker())
            {
                return db.getUsersCoordinteByRange(0);
            }
        }

        [HttpPost]
        public string getUser(string data)
        {
            using (var db = new DbWorker())
            {
                string model = db.getModel(data);

                return model;
            }
        }
    }
}