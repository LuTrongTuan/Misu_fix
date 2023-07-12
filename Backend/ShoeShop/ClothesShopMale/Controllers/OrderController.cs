using ClothesShopMale.Models;
using ClothesShopMale.Models.DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class OrderController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpPost]
        [Route("api/v1/order/get-list")]
        public ResponseBase<List<sp_LoadOrderResult>> GetList(Order req)
        {
            try
            {
                var list = db.sp_LoadOrder().ToList();

                if (req != null)
                {
                    if (!String.IsNullOrEmpty(req.order_code))
                    {
                        list = list.Where(x => $"HD00{x.order_id}" == req.order_code).ToList();
                    }
                    if (!String.IsNullOrEmpty(req.full_name))
                    {
                        list = list.Where(x => x.full_name.ToLower().Contains(req.full_name.ToLower())).ToList();
                    }
                    if (!String.IsNullOrEmpty(req.phone))
                    {
                        list = list.Where(x => x.phone.ToLower().Contains(req.phone.ToLower())).ToList();
                    }
                    if (req.status != null)
                    {
                        list = list.Where(x => x.status == req.status).ToList();
                    }
                    if (req.type_payment != null)
                    {
                        list = list.Where(x => x.type_payment == req.type_payment).ToList();
                    }
                    if (req.created_at != null)
                    {
                        list = list.Where(x => x.created_at == req.created_at).ToList();
                    }
                    if (req.deleted_at != null)
                    {
                        list = list.Where(x => x.deleted_at == req.deleted_at).ToList();
                    }
                }

                return new ResponseBase<List<sp_LoadOrderResult>>
                {
                    data = list,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<sp_LoadOrderResult>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/order")]
        public ResponseBase<bool> Save(Order req)
        {
            try
            {
                var listCartItem = JsonConvert.DeserializeObject<List<ProductAttributeDTO>>(req.order_item);
                if (listCartItem.Any())
                {
                    listCartItem.ForEach(x =>
                    {
                        var pa = db.ProductAttributes?.FirstOrDefault(p => p.product_attribue_id == x.product_attribue_id) ?? null;
                        if (pa != null)
                        {
                            pa.amount -= x.amountCart;
                            db.SubmitChanges();
                        }
                    });
                }
                req.created_at = DateTime.Now;
                req.type = 1;
                db.Orders.InsertOnSubmit(req);
                db.SubmitChanges();
                return new ResponseBase<bool>
                {
                    data = true,
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
        [Route("api/v1/order/cancle/{id}")]
        public ResponseBase<bool> Cancle(int id = 0)
        {
            try
            {
                var ord = db.Orders.Where(x => x.order_id == id).FirstOrDefault();
                ord.status = 4;
                ord.deleted_at = DateTime.Now;
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

        [HttpDelete]
        [Route("api/v1/order/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var ord = db.Orders.Where(x => x.order_id == id).FirstOrDefault();
                ord.status = 4;
                ord.deleted_at = DateTime.Now;
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
        [Route("api/v1/order/updateStatus/{id}/{status}")]
        public ResponseBase<bool> UpdateStatus(int id = 0, int status = 0)
        {
            try
            {
                var ord = db.Orders.Where(x => x.order_id == id).FirstOrDefault();
                ord.status = status;
                ord.updated_at = DateTime.Now;
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


        [HttpPost]
        [Route("api/v1/order/orderByFilter")]
        public ResponseBase<List<sp_LoadOrderResult>> GetByFitler(FilterOrder req)
        {
            try
            {
                List<sp_LoadOrderResult> result = db.sp_LoadOrder().ToList();
                if (req.status > 0)
                {
                    result = result.Where(x => x.status == req.status).ToList();
                }

                return new ResponseBase<List<sp_LoadOrderResult>>
                {
                    data = result,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<sp_LoadOrderResult>>
                {
                    status = 500
                };
            }
        }
    }
}