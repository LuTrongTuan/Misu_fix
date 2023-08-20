using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClothesShopMale.Models.DTO
{
    public class AccountDTO: Account
    {
        public string token { get; set; }
    }
}