using ClothesShopMale.Models;
using ClothesShopMale.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class CategoryController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/category")]
        public ResponseBase<List<CategoryDTO>> GetList()
        {
            try
            {
                return new ResponseBase<List<CategoryDTO>>
                {
                    data = db.Categories.Select(x => new CategoryDTO { 
                        category_id = x.category_id,
                        category_code = x.category_code,
                        category_name = x.category_name,
                        status = x.status.GetValueOrDefault(),
                        image = x.image,
                        created_at = x.created_at,
                        updated_at = x.updated_at,
                        deleted_at = x.deleted_at
                    }).ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<CategoryDTO>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/category")]
        public ResponseBase<Category> Save(Category req)
        {
            try
            {
                if (req.category_id > 0)
                {
                    var category = db.Categories.Where(x => x.category_id == req.category_id).FirstOrDefault();
                    category.category_code = req.category_code;
                    category.category_name = req.category_name;
                    category.image = req.image;
                    db.SubmitChanges();
                }
                else
                {
                    db.Categories.InsertOnSubmit(req);
                    db.SubmitChanges();
                }
                return new ResponseBase<Category>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Category>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/category/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var acc = db.Categories.Where(x => x.category_id == id).FirstOrDefault();
                db.Categories.DeleteOnSubmit(acc);
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