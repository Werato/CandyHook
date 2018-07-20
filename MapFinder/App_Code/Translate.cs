using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MapFinder.App_Code
{
    public class Translate : IDisposable
    {
        public string lang
        {
            get
            {
                return "Ang";
            }
        }

        public string Trs(string words)
        {
            string returnedString = "";

            foreach (var word in words.Split(' '))
            {
                returnedString += word + " ";//ToDo HERE translate
            }

            return returnedString;

        }

        public void Dispose()
        {

        }

    }
}