using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClothesShopMale.Models.DTO
{
    public class ProductAttributeDTO
    {
        public int product_attribute_id { get; set; }
        public int product_attribue_id { get; set; }
        public string size { get; set; }
        public string color { get; set; }
        public decimal price { get; set; }
        public int product_id { get; set; }
        public int amount { get; set; }
        public int amountCart { get; set; }
        public int amount_bought { get; set; }
        public string product_name { get; set; }
    }
}