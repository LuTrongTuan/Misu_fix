using ClothesShopMale.Models;
using ClothesShopMale.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class ProductAttributeController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/productattribute")]
        public ResponseBase<List<ProductAttributeDTO>> GetAttribute()
        {
            try
            {
                return new ResponseBase<List<ProductAttributeDTO>>
                {
                    data = db.ProductAttributes.Select(x => new ProductAttributeDTO { 
                        product_attribute_id = x.product_attribue_id,
                        size = x.size,
                        color = x.color,
                        price = x.price.GetValueOrDefault(),
                        product_id = x.product_id.GetValueOrDefault(),
                        amount = x.amount.GetValueOrDefault()
                    }).ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<ProductAttributeDTO>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/productattribute/save")]
        public ResponseBase<bool> Save(ProductAttribute req)
        {
            try
            {
                if (req.product_attribue_id > 0)
                {
                    var pa = db.ProductAttributes.FirstOrDefault(x => x.product_attribue_id == req.product_attribue_id);
                    pa.size = req.size;
                    pa.color = req.color;
                    pa.amount = req.amount;
                    pa.price = req.price;
                    db.SubmitChanges();
                }
                else
                {
                    db.ProductAttributes.InsertOnSubmit(req);
                    db.SubmitChanges();
                }
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

        [HttpPost]
        [Route("api/v1/productattribute/save-image-product")]
        public ResponseBase<bool> SaveImageProduct(ProductImageDTO req)
        {
            try
            {
                var listPImage = db.ProductImages.Where(x => x.product_id == req.product_id);
                db.ProductImages.DeleteAllOnSubmit(listPImage);
                db.SubmitChanges();
                req.list_image_checked.ForEach(x => {
                    db.ProductImages.InsertOnSubmit(new ProductImage { 
                        image = x,
                        product_id = req.product_id
                    });
                    db.SubmitChanges();
                });
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
        [Route("api/v1/productattribute/detail")]
        public ResponseBase<IEnumerable<ProductDetailDTO>> GetListDetail()
        {
            try
            {
                return new ResponseBase<IEnumerable<ProductDetailDTO>>
                {
                    data = db.ProductDetails.Select(x => new ProductDetailDTO { 
                        product_detail_id = x.product_detail_id,
                        detail = x.detail,
                        product_id = x.product_id.GetValueOrDefault()
                    }).ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<IEnumerable<ProductDetailDTO>>
                {
                    status = 500
                };
            }
        }

        [HttpGet]
        [Route("api/v1/productattribute/image")]
        public ResponseBase<List<ProductImageDTO>> GetListImage()
        {
            try
            {
                return new ResponseBase<List<ProductImageDTO>>
                {
                    data = db.ProductImages.Select(x => new ProductImageDTO { 
                        product_image_id = x.product_image_id,
                        image = x.image,
                        product_id = x.product_id.GetValueOrDefault()
                    }).ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<ProductImageDTO>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/productattribute")]
        public ResponseBase<ProductAttribute> SaveColor(ProductAttribute req)
        {
            try
            {
                db.ProductAttributes.InsertOnSubmit(req);
                db.SubmitChanges();
                return new ResponseBase<ProductAttribute>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<ProductAttribute>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/productattribute/detail/save")]
        public ResponseBase<bool> SaveDetail(ProductDetail req)
        {
            try
            {
                db.ProductDetails.InsertOnSubmit(req);
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

        [HttpPost]
        [Route("api/v1/productattribute/image")]
        public ResponseBase<ProductImage> SaveImage(ProductImage req)
        {
            try
            {
                db.ProductImages.InsertOnSubmit(req);
                db.SubmitChanges();
                return new ResponseBase<ProductImage>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<ProductImage>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/productattribute/{id}")]
        public ResponseBase<bool> DeleteAttribute(int id = 0)
        {
            try
            {
                var acc = db.ProductAttributes.Where(x => x.product_attribue_id == id).FirstOrDefault();
                db.ProductAttributes.DeleteOnSubmit(acc);
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
        [Route("api/v1/productattribute/detail/{id}")]
        public ResponseBase<bool> DeleteDetail(int id = 0)
        {
            try
            {
                var acc = db.ProductDetails.Where(x => x.product_detail_id == id).FirstOrDefault();
                db.ProductDetails.DeleteOnSubmit(acc);
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
        [Route("api/v1/productattribute/image/{id}")]
        public ResponseBase<bool> DeleteImage(int id = 0)
        {
            try
            {
                var acc = db.ProductImages.Where(x => x.product_image_id == id).FirstOrDefault();
                db.ProductImages.DeleteOnSubmit(acc);
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