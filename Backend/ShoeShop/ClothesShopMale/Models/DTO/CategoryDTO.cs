using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClothesShopMale.Models.DTO
{
    public class CategoryDTO
    {
        public int category_id { get; set; }
        public string category_code { get; set; }
        public string category_name { get; set; }
        public int status { get; set; }
        public string image { get; set; }
        public DateTime? created_at { get; set; }
        public DateTime? updated_at { get; set; }
        public DateTime? deleted_at { get; set; }

    }
}