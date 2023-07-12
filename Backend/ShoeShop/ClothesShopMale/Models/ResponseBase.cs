using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClothesShopMale.Models
{
    public class ResponseBase<T>
    {
        public T data { get; set; }
        public int status { get; set; }
    }
}