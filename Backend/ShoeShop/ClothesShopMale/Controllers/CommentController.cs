using ClothesShopMale.Models;
using ClothesShopMale.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class CommentController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/comment")]
        public ResponseBase<List<CommentDTO>> GetList()
        {
            try
            {
                return new ResponseBase<List<CommentDTO>>
                {
                    data = (from a in db.Comments
                            select new CommentDTO {
                                comment_id = a.comment_id,
                                account_id = a.account_id,
                                comment1 = a.comment1,
                                created_at = a.created_at,
                                product_id = a.product_id,
                                star = a.star,
                                user_name = db.Accounts.Where(x => x.account_id == a.account_id).FirstOrDefault().user_name ?? ""
                            }).ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<CommentDTO>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/comment")]
        public ResponseBase<Comment> Save(Comment req)
        {
            try
            {
                req.created_at = DateTime.Now;
                db.Comments.InsertOnSubmit(req);
                db.SubmitChanges();
                return new ResponseBase<Comment>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Comment>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/comment/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var acc = db.Comments.Where(x => x.comment_id == id).FirstOrDefault();
                db.Comments.DeleteOnSubmit(acc);
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
    }
}