using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClothesShopMale.Models.DTO
{
    public class BrandDTO
    {
        public int brand_id { get; set; }
        public string brand_code { get; set; }
        public string brand_name { get; set; }
        public int status { get; set; }
        public string image { get; set; }
        public DateTime? created_at { get; set; }
        public DateTime? update_at { get; set; }
        public DateTime? deleted_at { get; set; }
    }
}