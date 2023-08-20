using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClothesShopMale.Models
{
    public class FilterOrderInfo : Order
    {
        public DateTime? from_date { get; set; }
        public DateTime? to_date { get; set; }
    }
    public class FilterOrder {
        public int status { get; set; }
    }
}