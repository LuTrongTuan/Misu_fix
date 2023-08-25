using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClothesShopMale.Models.DTO
{
    public class OrderDTO
    {
        public int order_id { get; set; }
        public int account_id { get; set; }
        public string cusomter_type { get; set; }
        public string order_code { get; set; }
        public string seller { get; set; }
        public string phone_seller { get; set; }
        public double coupon { get; set; }
        public int payment_type { get; set; }
        public string bought_type { get; set; }
        public bool waiting { get; set; }
        public string data_cart { get; set; }
        public string address { get; set; }
        public string full_name { get; set; }
        public string note { get; set; }
        public string order_item { get; set; }
        public string phone { get; set; }
        public int status { get; set; }
        public int type_payment { get; set; }
        public decimal fee_ship { get; set; }
        public int id_city { get; set; }
        public int id_district { get; set; }
        public int id_ward { get; set; }
        public decimal total { get; set; }
        public DateTime? created_at { get; set; }
        public DateTime? deleted_at { get; set; }
        public DateTime? updated_at { get; set; }
        public DateTime? from_date { get; set; }
        public DateTime? to_date { get; set; }
        public int type { get; set; }
    }

    public class OrderInfoDTO
    {
        public Order Order { get; set; }
        public string ListAllProduct { get; set; }
    }
}