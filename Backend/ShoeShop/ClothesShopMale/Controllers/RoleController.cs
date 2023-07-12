using ClothesShopMale.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class RoleController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/role")]
        public ResponseBase<List<Role>> GetList()
        {
            try
            {
                return new ResponseBase<List<Role>>
                {
                    data = db.Roles.ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<Role>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/role")]
        public ResponseBase<Role> Save(Role req)
        {
            try
            {
                if (req.role_id > 0)
                {
                    var role = db.Roles.Where(x => x.role_id == req.role_id).FirstOrDefault();
                    role.role_code = req.role_code;
                    role.role_name = req.role_name;
                    db.SubmitChanges();
                }
                else
                {
                    db.Roles.InsertOnSubmit(req);
                    db.SubmitChanges();
                }
                return new ResponseBase<Role>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Role>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/role/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var acc = db.Roles.Where(x => x.role_id == id).FirstOrDefault();
                db.Roles.DeleteOnSubmit(acc);
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