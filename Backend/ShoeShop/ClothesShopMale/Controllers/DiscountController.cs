using ClothesShopMale.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class DiscountController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/discount")]
        public ResponseBase<List<Discount>> GetList()
        {
            try
            {
                return new ResponseBase<List<Discount>>
                {
                    data = db.Discounts.ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<Discount>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/discount")]
        public ResponseBase<Discount> Save(Discount req)
        {
            try
            {
                req.status = 1;
                req.created_at = DateTime.Now;
                db.Discounts.InsertOnSubmit(req);
                db.SubmitChanges();
                return new ResponseBase<Discount>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Discount>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/discount/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var acc = db.Discounts.Where(x => x.discount_id == id).FirstOrDefault();
                db.Discounts.DeleteOnSubmit(acc);
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