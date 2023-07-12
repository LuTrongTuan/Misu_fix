using ClothesShopMale.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class BlogController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/blog")]
        public ResponseBase<List<Blog>> GetList()
        {
            try
            {
                return new ResponseBase<List<Blog>>
                {
                    data = db.Blogs.ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<Blog>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/blog")]
        public ResponseBase<Blog> Save(Blog req)
        {
            try
            {
                req.created_at = DateTime.Now;
                db.Blogs.InsertOnSubmit(req);
                db.SubmitChanges();
                return new ResponseBase<Blog>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Blog>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/blog/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var acc = db.Blogs.Where(x => x.blog_id == id).FirstOrDefault();
                db.Blogs.DeleteOnSubmit(acc);
                db.SubmitChanges();
                return new ResponseBase<bool>
                {
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<bool>
                {
                    status = 500
                };
            }
        }

        [HttpGet]
        [Route("api/v1/blog/{id}")]
        public ResponseBase<Blog> FindById(int id = 0)
        {
            try
            {
                var acc = db.Blogs.Where(x => x.blog_id == id).FirstOrDefault();
                return new ResponseBase<Blog>
                {
                    data = acc,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Blog>
                {
                    status = 500
                };
            }
        }
    }
}