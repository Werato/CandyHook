using Database;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography;
using System.Web;

namespace MapFinder.App_Code
{
    public class DbWorker : IDisposable
    {

        public string getModelByUserId(string UserId)
        {
            using (var db = new ModelDataContext())
            {
                //by user Id Get photo
                var model = from u in db.Users
                            join p in db.Photos on u.UserId equals p.ObjectId into tmp
                            where u.UserId == Convert.ToInt32(UserId)
                            from photo in tmp.DefaultIfEmpty()
                            select new
                            {
                                photo.PhotoId,
                                userData = JsonConvert.SerializeObject(u)
                            };

                return JsonConvert.SerializeObject(model);//.ToString();
            }


        }

        public string getUsersCoordinteByRange(float range)
        {
            string userJsonCoord;

            using (var db = new ModelDataContext())
            {
                var user = db.Users.Select(l => new { l.Lat, l.Lon, l.UserId }).ToList();
                userJsonCoord = JsonConvert.SerializeObject(user);
            }

            return userJsonCoord;
        }

        public void linqEntityAndPhotos(List<int> PhotoId, int UserId)
        {
            using (var db = new ModelDataContext())
            {

                var photo = db.Photos.Where(l => PhotoId.Contains(l.PhotoId)).ToList();

                photo.ForEach(l => { l.ObjectId = UserId; l.ObjectName = "Users"; });
                db.SubmitChanges();
            }
        }

        public int SaveUser(string userData)
        {
            using (var db = new ModelDataContext())
            {
                User user = new User();
                user = JsonConvert.DeserializeObject<User>(userData);

                user.Password = CalculateMD5Hash(user.Password);

                db.Users.InsertOnSubmit(user);

                db.SubmitChanges();

                return user.UserId; //Json(getUsersCoordinteByRange(0));
            }
        }

        public int StoreFile(HttpPostedFileBase file)
        {
            byte[] data = new byte[file.ContentLength];
            file.InputStream.Read(data, 0, file.ContentLength);

            using (var db = new ModelDataContext())
            {
                var photo = new Photo();// db;//.Select(x => new { x.Lat, x.Lon }).ToList();

                photo.FileData = data;
                photo.MnimeType = file.ContentType;

                db.Photos.InsertOnSubmit(photo);

                db.SubmitChanges();

                return photo.PhotoId;
                //return Json(getUsersCoordinteByRange(0));

            }
        }

        private string CalculateMD5Hash(string input)
        {
            // step 1, calculate MD5 hash from input
            MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
            byte[] hash = md5.ComputeHash(inputBytes);

            // step 2, convert byte array to hex string
            string sb = "";
            for (int i = 0; i < hash.Length; i++)
            {
                sb += (hash[i].ToString("X2"));
            }
            return sb.ToString();
        }

        public void Dispose()
        {
        }

    }
}