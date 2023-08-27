using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClothesShopMale.Models.DTO
{
    public class ProductDTO: Product
    {
        public string product_name { get; set; }
        public string category_name { get; set; }
        public string brand_name { get; set; }
        public string color { get; set; }
        public string size { get; set; }
        public double price { get; set; }
        public int amount { get; set; }
        public decimal min_price { get; set; }
        public decimal max_price { get; set; }
        public string fitler_price { get; set; }
    }
}