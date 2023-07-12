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
    public class OrderInfoController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpPost]
        [Route("api/v1/orderInfor/filter")]
        public ResponseBase<List<Order>> GetList(FilterOrderInfo req)
        {
            try
            {
                var list = db.Orders.Where(x => x.type == 2).ToList();
                if (req != null)
                {
                    if (!String.IsNullOrEmpty(req.order_code))
                    {
                        list = list.Where(x => x.order_code.ToLower().Contains(req.order_code)).ToList();
                    }
                    if (req.from_date != null)
                    {
                        list = list.Where(x => x.created_at >= req.from_date).ToList();
                    }
                    if (req.to_date != null)
                    {
                        list = list.Where(x => x.created_at <= req.to_date).ToList();
                    }
                }
                return new ResponseBase<List<Order>>
                {
                    data = list,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<Order>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/orderInfor")]
        public ResponseBase<Order> Save(Order req)
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
                if (req.order_id > 0)
                {
                    var order = db.Orders.Where(x => x.order_id == req.order_id).FirstOrDefault();
                    order.phone = req.phone;
                    order.cusomter_type = req.cusomter_type;
                    order.seller = req.seller;
                    order.phone_seller = req.seller;
                    order.id_city = req.id_city;
                    order.id_district = req.id_district;
                    order.id_ward = req.id_ward;
                    order.address = req.address;
                    order.waiting = req.waiting;
                    order.note = req.note;
                    order.updated_at = DateTime.Now;
                    order.type = 2;
                    db.SubmitChanges();
                }
                else
                {
                    req.created_at = DateTime.Now;
                    db.Orders.InsertOnSubmit(req);
                    db.SubmitChanges();
                }
                return new ResponseBase<Order>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Order>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/orderInfor/updateItem")]
        public ResponseBase<Order> UpdateItem(OrderInfoDTO req)
        {
            try
            {
                var listCartItem = JsonConvert.DeserializeObject<List<ProductAttributeDTO>>(req.Order.order_item);

                if (req.Order.order_id > 0)
                {
                    var order = db.Orders.Where(x => x.order_id == req.Order.order_id).FirstOrDefault();
                    order.order_item = req.Order.order_item;
                    order.total = req.Order.total;
                    db.SubmitChanges();

                    foreach (var item in JsonConvert.DeserializeObject<List<ProductAttributeDTO>>(req.ListAllProduct))
                    {
                        var pa = db.ProductAttributes.FirstOrDefault(x => x.product_attribue_id == item.product_attribue_id);
                        pa.amount = item.amount;
                        db.SubmitChanges();
                    }
                }
                else
                {
                    return new ResponseBase<Order>
                    {
                        status = 500
                    };
                }
                return new ResponseBase<Order>
                {
                    data = req.Order,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Order>
                {
                    status = 500
                };
            }
        }

        [HttpGet]
        [Route("api/v1/orderInfor/cancleOrder/{order_infor_id}")]
        public ResponseBase<Order> CancleOrder(int order_infor_id = 0)
        {
            try
            {
                if (order_infor_id > 0)
                {
                    var order = db.Orders.Where(x => x.order_id == order_infor_id).FirstOrDefault();
                    order.status = 4;
                    var listCartItem = JsonConvert.DeserializeObject<List<ProductAttributeDTO>>(order.order_item);
                    if (listCartItem.Any())
                    {
                        listCartItem.ForEach(x =>
                        {
                            var pa = db.ProductAttributes?.FirstOrDefault(p => p.product_attribue_id == x.product_attribue_id) ?? null;
                            if (pa != null)
                            {
                                pa.amount += x.amountCart;
                                db.SubmitChanges();
                            }
                        });
                    }
                    db.SubmitChanges();
                }
                else
                {
                    return new ResponseBase<Order>
                    {
                        status = 500
                    };
                }
                return new ResponseBase<Order>
                {
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Order>
                {
                    status = 500
                };
            }
        }
        [HttpGet]
        [Route("api/v1/orderInfor/getById/{order_infor_id}")]
        public ResponseBase<Order> GetById(int order_infor_id = 0)
        {
            try
            {

                var order = db.Orders.Where(x => x.order_id == order_infor_id).FirstOrDefault();

                return new ResponseBase<Order>
                {
                    data = order,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Order>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/orderInfor/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var acc = db.Orders.Where(x => x.order_id == id).FirstOrDefault();
                db.Orders.DeleteOnSubmit(acc);
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
        [Route("api/v1/orderInfor/updateOrder")]
        public ResponseBase<Order> UpdateOrder(OrderInfoDTO req)
        {
            try
            {
                var listCartItem = JsonConvert.DeserializeObject<List<ProductAttributeDTO>>(req.Order.order_item);
                var listCartItemDB = new List<ProductAttributeDTO>();
                var _orderItem = db.Orders.FirstOrDefault(x => x.order_id == req.Order.order_id).order_item;
                
                if (req.Order.order_id > 0)
                {
                    if (!String.IsNullOrEmpty(_orderItem))
                    {
                        listCartItemDB = JsonConvert.DeserializeObject<List<ProductAttributeDTO>>(_orderItem);
                        foreach (var item in listCartItemDB)
                        {
                            var pa = db.ProductAttributes.FirstOrDefault(x => x.product_attribue_id == item.product_attribue_id);
                            pa.amount += item.amountCart;
                            db.SubmitChanges();
                        }
                    }

                    var order = db.Orders.Where(x => x.order_id == req.Order.order_id).FirstOrDefault();
                    order.order_item = JsonConvert.SerializeObject(listCartItem);
                    order.total = listCartItem.Sum(x => x.amountCart * x.price);
                    db.SubmitChanges();

                    foreach (var item in JsonConvert.DeserializeObject<List<ProductAttributeDTO>>(req.Order.order_item))
                    {
                        var pa = db.ProductAttributes.FirstOrDefault(x => x.product_attribue_id == item.product_attribue_id);
                        pa.amount -= item.amountCart;
                        db.SubmitChanges();
                    }
                }
                else
                {
                    return new ResponseBase<Order>
                    {
                        status = 500
                    };
                }
                return new ResponseBase<Order>
                {
                    data = req.Order,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Order>
                {
                    status = 500
                };
            }
        }
    }
}