using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClothesShopMale.Models
{
    public class FilterProduct
    {
        public string fitlerPrice { get; set; }
        public int brand_id { get; set; }
        public int category_id { get; set; }
    }
}