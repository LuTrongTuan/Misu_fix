using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClothesShopMale.Models.DTO
{
    public class ProductImageDTO
    {
        public int product_image_id { get; set; }
        public string image { get; set; }
        public int product_id { get; set; }
        public List<string> list_image_checked { get; set; }
    }
}