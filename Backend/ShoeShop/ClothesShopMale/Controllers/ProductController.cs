using ClothesShopMale.Models;
using ClothesShopMale.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class ProductController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpPost]
        [Route("api/v1/product/get-list")]
        public ResponseBase<List<ProductDTO>> GetList(ProductDTO req)
        {
            try
            {
                var list = (from a in db.Products
                            select new ProductDTO
                            {
                                product_id = a.product_id,
                                brand_id = a.brand_id,
                                category_id = a.category_id,
                                origin = a.origin,
                                product_name = a.product_name,
                                status = a.status,
                                created_at = a.created_at,
                                updated_at = a.updated_at,
                                deleted_at = a.deleted_at,
                                product_code = a.product_code,
                                category_name = db.Categories.Where(x => x.category_id == a.category_id).FirstOrDefault().category_name ?? "",
                                brand_name = db.Brands.Where(x => x.brand_id == a.brand_id).FirstOrDefault().brand_name ?? ""
                            }).ToList();
                foreach (var p in list)
                {
                    p.min_price = db.ProductAttributes.Where(x => x.product_id == p.product_id).OrderBy(m => m.price).FirstOrDefault().price ?? 0;
                    p.max_price = db.ProductAttributes.Where(x => x.product_id == p.product_id).OrderByDescending(m => m.price).FirstOrDefault().price ?? 0;
                }
                if (req != null)
                {
                    if (!String.IsNullOrEmpty(req.product_code))
                    {
                        list = list.Where(x => x.product_code.Contains(req.product_code)).ToList();
                    }
                    if (!String.IsNullOrEmpty(req.product_name))
                    {
                        list = list.Where(x => x.product_name.ToLower().Contains(req.product_name.ToLower())).ToList();
                    }
                    if (req.category_id != null)
                    {
                        list = list.Where(x => x.category_id == req.category_id).ToList();
                    }
                    if (req.brand_id != null)
                    {
                        list = list.Where(x => x.brand_id == req.brand_id).ToList();
                    }
                    if (!String.IsNullOrEmpty(req.fitler_price))
                    {
                        if (req.fitler_price.Equals("gt500"))
                        {
                            list = list.Where(x => x.price > 500000).ToList();
                        }
                        if (req.fitler_price.Equals("lt500"))
                        {
                            list = list.Where(x => x.price < 500000).ToList();
                        }
                        if (req.fitler_price.Equals("gt1000"))
                        {
                            list = list.Where(x => x.price > 1000000).ToList();
                        }
                    }
                }
                return new ResponseBase<List<ProductDTO>>
                {
                    data = list,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<ProductDTO>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/productByFilter")]
        public ResponseBase<List<ProductDTO>> GetByFitler(FilterProduct req)
        {
            try
            {
                var list = (from a in db.Products
                            select new ProductDTO
                            {
                                product_id = a.product_id,
                                brand_id = a.brand_id,
                                category_id = a.category_id,
                                origin = a.origin,
                                product_name = a.product_name,
                                status = a.status,
                                created_at = a.created_at,
                                updated_at = a.updated_at,
                                deleted_at = a.deleted_at,
                                product_code = a.product_code,
                                category_name = db.Categories.Where(x => x.category_id == a.category_id).FirstOrDefault().category_name ?? "",
                                brand_name = db.Brands.Where(x => x.brand_id == a.brand_id).FirstOrDefault().brand_name ?? "",
                            }).ToList();
                if (!string.IsNullOrEmpty(req.fitlerPrice))
                {
                    if (req.fitlerPrice.Equals("gt500"))
                    {
                        var listGT500 = db.ProductAttributes.Where(x => x.price > 500000).Select(p => p.product_id);
                        if (listGT500.Any())
                        {
                            list = list.Where(x => listGT500.Any(p => p.GetValueOrDefault() == x.product_id)).ToList();
                        }
                    }
                    if (req.fitlerPrice.Equals("lt500"))
                    {
                        var listLT500 = db.ProductAttributes.Where(x => x.price < 500000).Select(p => p.product_id);
                        if (listLT500.Any())
                        {
                            list = list.Where(x => listLT500.Any(p => p.GetValueOrDefault() == x.product_id)).ToList();
                        }
                    }
                    if (req.fitlerPrice.Equals("gt1000"))
                    {
                        var listGT1000 = db.ProductAttributes.Where(x => x.price > 1000000).Select(p => p.product_id);
                        if (listGT1000.Any())
                        {
                            list = list.Where(x => listGT1000.Any(p => p.GetValueOrDefault() == x.product_id)).ToList();
                        }
                    }
                }
                if (req.brand_id > 0)
                {
                    list = list.Where(x => x.brand_id == req.brand_id).ToList();
                }
                if (req.category_id > 0)
                {
                    list = list.Where(x => x.category_id == req.category_id).ToList();
                }
                return new ResponseBase<List<ProductDTO>>
                {
                    data = list.ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<ProductDTO>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/product")]
        public ResponseBase<Product> Save(ProductDTO req)
        {
            try
            {
                if (req.product_id > 0)
                {
                    var product = db.Products.Where(x => x.product_id == req.product_id).FirstOrDefault();
                    product.brand_id = req.brand_id;
                    product.category_id = req.category_id;
                    product.origin = req.origin;
                    product.product_name = req.product_name;
                    product.updated_at = DateTime.Now;
                    product.product_code = req.product_code;
                    db.SubmitChanges();
                    db.SubmitChanges();
                }
                else
                {
                    var _product = new Product();
                    _product.brand_id = req.brand_id;
                    _product.category_id = req.category_id;
                    _product.origin = req.origin;
                    _product.product_name = req.product_name;
                    _product.status = 1;
                    _product.created_at = DateTime.Now;
                    _product.product_code = req.product_code;
                    _product.status = 1;
                    db.Products.InsertOnSubmit(_product);
                    db.SubmitChanges();
                    db.SubmitChanges();
                }
                return new ResponseBase<Product>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Product>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/product/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var acc = db.Products.Where(x => x.product_id == id).FirstOrDefault();
                db.Products.DeleteOnSubmit(acc);
                db.SubmitChanges();
                var att = db.ProductAttributes.Where(x => x.product_id == id);
                db.ProductAttributes.DeleteAllOnSubmit(att);
                db.SubmitChanges();
                var dt = db.ProductDetails.Where(x => x.product_id == id);
                db.ProductDetails.DeleteAllOnSubmit(dt);
                db.SubmitChanges();
                var img = db.ProductImages.Where(x => x.product_id == id);
                db.ProductImages.DeleteAllOnSubmit(img);
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
        [Route("api/v1/product/sizes")]
        public ResponseBase<List<SizeDTO>> GetListSize()
        {
            try
            {
                var data = db.ProductAttributes.Select(x => x.size).ToList() ?? new List<string>();
                var listString = new List<string>();
                var listResult = new List<SizeDTO>();
                var count = 0;
                if (data.Count > 0)
                {
                    data.ForEach(x =>
                    {
                        var size = x.Split(',');
                        listString.AddRange(size);
                    });
                }

                if (listString.Count > 0)
                {
                    foreach (var str in listString.Distinct())
                    {
                        count++;
                        listResult.Add(new SizeDTO
                        {
                            id = count,
                            name = str,
                            size = str
                        });
                    }
                }

                return new ResponseBase<List<SizeDTO>>
                {
                    data = listResult.Distinct().OrderBy(x => x.size).ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<SizeDTO>>
                {
                    status = 500
                };
            }
        }

        [HttpGet]
        [Route("api/v1/product/colors")]
        public ResponseBase<List<ColorDto>> GetListColor()
        {
            try
            {
                var data = db.ProductAttributes.Select(x => x.color).ToList() ?? new List<string>();
                var listString = new List<string>();
                var listResult = new List<ColorDto>();
                var count = 0;
                if (data.Count > 0)
                {
                    data.ForEach(x =>
                    {
                        var size = x.Split(',');
                        listString.AddRange(size);
                    });
                }

                if (listString.Count > 0)
                {
                    foreach (var str in listString.Distinct())
                    {
                        count++;
                        listResult.Add(new ColorDto
                        {
                            id = count,
                            name = str,
                            color = str
                        });
                    }
                }

                return new ResponseBase<List<ColorDto>>
                {
                    data = listResult.Distinct().OrderBy(x => x.color).ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<ColorDto>>
                {
                    status = 500
                };
            }
        }

        [HttpGet]
        [Route("api/v1/product_all")]
        public ResponseBase<List<sp_ProductLoadListAllResult>> GetAllProduct()
        {
            try
            {
                var list = db.sp_ProductLoadListAll().ToList();
                return new ResponseBase<List<sp_ProductLoadListAllResult>>
                {
                    data = list.ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<sp_ProductLoadListAllResult>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/product/check_stock")]
        public ResponseBase<bool> CheckStock(ProductAttributeDTO req)
        {
            try
            {
                if (req.product_attribue_id > 0)
                {
                    var _att = db.ProductAttributes.FirstOrDefault(x => x.product_attribue_id == req.product_attribue_id);
                    if (_att.amount - req.amountCart < 0)
                    {
                        return new ResponseBase<bool>
                        {
                            data = false,
                            status = 400
                        };
                    }
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
                    data = false,
                    status = 500
                };
            }
        }
    }
}