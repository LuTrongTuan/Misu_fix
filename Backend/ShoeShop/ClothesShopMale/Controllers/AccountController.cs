using ClothesShopMale.Models;
using ClothesShopMale.Models.DTO;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class AccountController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpPost]
        [Route("api/v1/account/get-list")]
        public ResponseBase<List<sp_Account_LoadResult>> GetList(AccountDTO req)
        {
            try
            {
                var list = db.sp_Account_Load().ToList();
                if (req != null)
                {
                    if (!String.IsNullOrEmpty(req.user_name))
                    {
                        list = list.Where(x => x.user_name.ToLower().Contains(req.user_name)).ToList();
                    }
                    if (!String.IsNullOrEmpty(req.phone))
                    {
                        list = list.Where(x => x.phone.Contains(req.phone)).ToList();
                    }
                    if (!String.IsNullOrEmpty(req.full_name))
                    {
                        list = list.Where(x => x.full_name.ToLower().Contains(req.full_name)).ToList();
                    }
                    if (!String.IsNullOrEmpty(req.email))
                    {
                        list = list.Where(x => x.email.ToLower().Contains(req.email)).ToList();
                    }
                }
                return new ResponseBase<List<sp_Account_LoadResult>>
                {
                    data = list,
                    status = 200,
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<sp_Account_LoadResult>>
                {
                    status = 500
                };
            }
        }

        [HttpGet]
        [Route("api/v1/account/findbyid/{id}")]
        public ResponseBase<Account> FindById(int id = 0)
        {
            try
            {
                return new ResponseBase<Account>
                {
                    data = db.Accounts.Where(x => x.account_id == id).FirstOrDefault(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Account>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/account/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var acc = db.Accounts.Where(x => x.account_id == id).FirstOrDefault();
                db.Accounts.DeleteOnSubmit(acc);
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
        [Route("api/v1/account")]
        public ResponseBase<Account> Insert(Account req)
        {
            try
            {
                if (req.account_id > 0)
                {
                    var acc = db.Accounts.Where(x => x.account_id == req.account_id).FirstOrDefault();
                    acc.updated_at = DateTime.Now;
                    acc.address = req.address;
                    acc.phone = req.phone;
                    acc.full_name = req.full_name;
                    acc.role_code = req.role_code;
                    acc.active = req.active;
                    acc.admin = req.admin;
                    acc.email = req.email;
                    acc.town = req.town;
                    acc.district = req.district;
                    acc.city = req.city;
                    db.SubmitChanges();
                }
                else
                {
                    db.Accounts.InsertOnSubmit(req);
                    db.SubmitChanges();
                }
                return new ResponseBase<Account>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Account>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/account/login")]
        public ResponseBase<AccountDTO> Login(AccountDTO req)
        {
            try
            {
                var acc = (from a in db.Accounts.Where(x => x.user_name == req.user_name && x.password == req.password)
                           select new AccountDTO
                           {
                               account_id = a.account_id,
                               user_name = a.user_name,
                               active = a.active,
                               admin = a.admin,
                               avatar = a.avatar,
                               full_name = a.full_name,
                               phone = a.phone,
                               role_code = a.role_code,
                               email = a.email,
                               town = a.town,
                               district = a.district,
                               city = a.city,
                               token = createToken(a.user_name)
                           }).FirstOrDefault();
                if (acc.account_id > 0)
                {
                    return new ResponseBase<AccountDTO>
                    {
                        data = acc,
                        status = 200
                    };
                }
                else
                {
                    return new ResponseBase<AccountDTO>
                    {
                        status = 500
                    };
                }
            }
            catch (Exception ex)
            {
                return new ResponseBase<AccountDTO>
                {
                    status = 500
                };
            }
        }

        public static string createToken(string Username)
        {
            //Set issued at date
            DateTime issuedAt = DateTime.UtcNow;
            //đặt thời gian hết hạn token
            DateTime expires = DateTime.UtcNow.AddDays(10);

            //http://stackoverflow.com/questions/18223868/how-to-encrypt-jwt-security-token
            var tokenHandler = new JwtSecurityTokenHandler();

            //create a identity and add claims to the user which we want to log in

            var userIdentity = new ClaimsIdentity("Identity");
            userIdentity.Label = "Identity";
            userIdentity.AddClaim(new Claim(ClaimTypes.Name, Username));
            userIdentity.AddClaim(new Claim("Username", Username));
            //userIdentity.AddClaim(new Claim("Category", Category));
            //userIdentity.HasClaim(ClaimTypes.Role, Category);
            var claims = new List<Claim>();

            var identity = new ClaimsPrincipal(userIdentity);
            Thread.CurrentPrincipal = identity;
            //string sec = EncryptCode;
            string sec = "088881139703564148785";
            //string sec = "401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1" + Category;
            var now = DateTime.UtcNow;
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(sec));
            var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);

            //create the jwt
            var token =
                (JwtSecurityToken)
                    tokenHandler.CreateJwtSecurityToken(issuer: "http://unisoft.edu.vn/", audience: "http://unisoft.edu.vn/",
                        subject: userIdentity, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
    }
}