import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent extends BaseComponent implements OnInit {

  p_id: any;
  product: any
  listPImage: any;
  listPDetail: any;
  listPColor: any;
  colorPick: any;
  countP: any = 1;
  sizePick: any = '';
  colorString: any;
  lstCommentByAccount: any;
  lstProductRecommend: any;
  comment: any;
  star: any;
  accountId: any = 0;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  isMouseover = true;

  countStar(star: number) {
    this.isMouseover = false;
    this.selectedValue = star;
  }

  addClass(star: number) {
    if (this.isMouseover) {
      this.selectedValue = star;
    }
  }

  removeClass() {
    if (this.isMouseover) {
      this.selectedValue = 0;
    }
  }

  ngOnInit(): void {
    this.getProduct();
    this.getProductImage();
    this.getListCommentByProduct();
    this.getListAccount();
    this.getlstProductRecommend();
    this.getListAllProduct();
    console.log(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('Cart')))));
    if (localStorage.getItem('UserInfo')) {
      this.accountId = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo')))).account_id;
    }
    this.p_id = this.route.snapshot.paramMap.get('product_id');
    this.listSize = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('lstSize'))));
    this.listPColor = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('lstColor'))));
    this.colorString = localStorage.getItem('lstColor');
  }

  deleteComment(id: any) {
    this.commentService.delete(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.success('Xóa nhận xét thành công !');
          setTimeout(window.location.reload.bind(window.location), 250);
        }
        else {
          this.toastr.warning('Xóa nhận xét thất bại !');
        }
      }
    );
  }

  getProduct() {
    this.productService.getList(null).subscribe(
      (res) => {
        this.product = res.data.filter((x: any) => x.product_id == this.p_id)[0];
        console.log(this.product);
        this.productService.getImage().subscribe(
          (res) => {
            this.listPImage = res.data.filter((x: any) => x.product_id == this.p_id);
            this.productService.getDetail().subscribe(
              (res) => {
                this.listPDetail = res.data.filter((x: any) => x.product_id == this.p_id);
              }
            )
          }
        )
      }
    )
  }

  getColor(event: any) {
    this.colorPick = event.value;
  }

  confirmProduct(p: any) {
    if (!this.colorPick || !this.sizePick) {
      this.toastr.warning('Bạn chưa chọn màu hoặc size để định giá');
    }
    else {
      if (this.listAllProduct.filter((x: any) => x.color == this.colorPick && x.size == this.sizePick && x.product_id == p.product_id).length > 0) {
        this.product.price = this.listAllProduct.filter((x: any) => x.color == this.colorPick && x.size == this.sizePick && x.product_id == p.product_id)[0].price;
        this.product.amount = this.listAllProduct.filter((x: any) => x.color == this.colorPick && x.size == this.sizePick && x.product_id == p.product_id)[0].amount;
        this.product.product_attribue_id = this.listAllProduct.filter((x: any) => x.color == this.colorPick && x.size == this.sizePick && x.product_id == p.product_id)[0].product_attribue_id;
      }
      else {
        this.toastr.warning('Không tìm thấy sản phẩm với thông tin bạn chọn');
        this.product.price = 0;
      }
    }
  }

  addToCart(p: any): boolean {
    if (!(this.countP > 0)) {
      this.toastr.warning('Số lượng sản phẩm phải > 0');
      return false;
    }
    if (this.countP > p.amount) {
      this.toastr.warning('Số lượng bạn nhập lớn hơn số lượng trong kho');
      return false;
    }
    if (!this.colorPick || !this.sizePick) {
      this.toastr.warning('Bạn chưa chọn màu hoặc size để định giá');
      return false;
    }
    else {
      if (this.listAllProduct.filter((x: any) => x.color == this.colorPick && x.size == this.sizePick && x.product_id == p.product_id).length > 0) {
        this.product.price = this.listAllProduct.filter((x: any) => x.color == this.colorPick && x.size == this.sizePick && x.product_id == p.product_id)[0].price;
      }
      else {
        this.toastr.warning('Không tìm thấy sản phẩm với thông tin bạn chọn');
        this.product.price = 0;
        return false;
      }
    }
    var dataAccount = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo'))));

    if (this.token) {
      var cartItem = {
        id: Math.random(),
        product_attribue_id: p.product_attribue_id,
        product_id: p.product_id,
        product_name: p.product_name,
        image: this.getImageProduct(p.product_id),
        amountCart: this.countP,
        price: p.price,
        total: `${this.countP} x ${p.price}`,
        color: this.colorPick,
        size: this.sizePick,
        account_id: dataAccount.account_id,
        createdTime: new Date().getTime(),
      };

      this.cart = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('Cart'))));
      var cart = this.cart?.filter((l: any)=> l.account_id === cartItem.account_id);
      if(cart?.length > 0 && cart != null){
        var c = this.cart.filter((c: any) => c.product_id == cartItem.product_id && c.size == cartItem.size && c.color == cartItem.color && c.account_id == cartItem.account_id);
        if (c.length > 0) {
          this.cart.forEach((c: any): any => {
            if (c.product_id == cartItem.product_id && c.color == cartItem.color && c.size == cartItem.size && c.account_id == cartItem.account_id) {
              c.amountCart += cartItem.amountCart;
              c.total = `${c.amountCart} x ${p.price}`
            }
          })
        }
        else {
          this.cart.push(cartItem);
        }
      }
      else {
        if(this.cart == null){
          this.cart =[];
        }
        this.cart.push(cartItem);
      }
      localStorage.setItem('Cart', JSON.stringify(this.cart));
      this.productService.minusAmount(cartItem).subscribe();
      this.toastr.success('Thêm giỏ hàng thành công !');
      setTimeout(window.location.reload.bind(window.location), 250);
      
      // var reqProd = {
      //   product_id: p.product_id,
      //   amount:  parseInt(p.amount)  - parseInt(this.countP),
      //   brand_id: p.brand_id,
      //   category_id: p.category_id,
      //   gender: p.gender,
      //   origin: p.origin,
      //   product_name: p.product_name,
      //   status: p.status,
      //   price: p.price,
      //   size: p.size.toString()
      // }
      // this.productService.save(reqProd).subscribe(
      //   (res) => {
      //     if (res) {
      //       localStorage.setItem('Cart', JSON.stringify(this.cart));
      //       this.toastr.success('Thêm giỏ hàng thành công !');
      //       this.getListProduct();
      //       setTimeout(window.location.reload.bind(window.location), 250);
      //     }
      //     else {
      //       this.toastr.success('Fail !');
      //     }
      //   }
      // );
    }
    else {
      this.toastr.warning('Bạn cần đăng nhập để thêm giỏ hàng !');
    }
    return true;
  }

  postCmt = () => {
    if (!localStorage.getItem('UserInfo')) {
      this.toastr.warning('Bạn cần đăng nhập để có thể thêm nhận xét !');
    }
    else {
      if (this.selectedValue > 5 || this.selectedValue < 1) {
        this.toastr.warning('Bạn hãy chọn số sao từ 1->5 !');
      }
      else {
        var acc_id = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo')))).account_id;
        var req = {
          account_id: acc_id,
          product_id: this.p_id,
          star: this.selectedValue,
          comment1: this.comment,
        }
        console.log(req);
        this.commentService.save(req).subscribe(
          (res) => {
            if (res) {
              this.toastr.success('Thành công !');
              setTimeout(window.location.reload.bind(window.location), 250);
            }
            else {
              this.toastr.warning('Thất bại !');
            }
          }
        );
      }
    }
  }

  listAccount: any;

  getListAccount() {
    this.Acc.getList().subscribe(
      (res) => {
        this.listAccount = res.data;
      })
  }

  getListCommentByProduct() {
    this.getListAccount();
    this.commentService.getList().subscribe(
      (res) => {
        // this.lstCommentByAccount = res.data.filter((x: any) => x.account_id == acc_id && x.product_id == this.p_id);
        this.lstCommentByAccount = res.data;
      }
    );
  }

  getlstProductRecommend() {
    this.productService.getList(null).subscribe(
      (res) => {
        if (res.data.length > 0) {
          this.lstProductRecommend = res.data.slice(0, 4);
        }
      }
    )
  }
}
