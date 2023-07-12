import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends BaseComponent implements OnInit {

  accountName: any;
  selectedStatus!: any;
  statusFilter: any;
  isEdit: any = false;

  filterStatusOrder: any = [
    { status: 0, name: 'Chờ xác nhận' },
    { status: 1, name: 'Chờ lấy hàng' },
    { status: 2, name: 'Đang giao' },
    { status: 3, name: 'Hoàn thành' },
    { status: 4, name: 'Đã hủy' },
    { status: 5, name: 'Chờ thanh toán' },
  ]

  statusOrder: any = [
    { status: 1, name: 'Chờ lấy hàng' },
    { status: 2, name: 'Đang giao' },
    { status: 3, name: 'Hoàn thành' },
    { status: 4, name: 'Đã hủy' },
  ]

  ngOnInit(): void {
    this.getListProduct(null);
    this.getListAllProduct();
    this.getListOrder(this.getRequest());
  }

  getRequest() {
    return {
      order_code: this.order_code_search ?? '',
      full_name: this.customer_search ?? '',
      phone: this.phone_search ?? '',
      status: this.status_search ?? null,
      type_payment: this.payment_search ?? null,
      created_at: this.order_date_search ?? null,
      deleted_at: this.cancle_date_search ?? null
    }
  }
  checkStatus(order: any, selectedStatus: any) {
    this.modal.confirm({
      nzTitle: '<i>Bạn có muốn thay đổi trạng thái ?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.orderService.updateStatus(order.order_id, selectedStatus.status).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Thành công !');
              this.getListOrder(this.getRequest());
              this.handleCancel();
            }
            else {
              this.toastr.warning('Thất bại !');
            }
          }
        )
      }
    });
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.orderService.delete(id).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Delete Success !');
              this.getListOrder(this.getRequest());
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListOrder(this.getRequest());
            }
          }
        )
      }
    });
  }

  confirmStatus(order: any, status: any) {
    this.modal.confirm({
      nzTitle: '<i>Bạn có chắc muốn cập nhật trạng thái đơn hàng này?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.orderService.updateStatus(order.order_id, status.status).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Success !');
              this.getListOrder(this.getRequest());
            }
            else {
              this.toastr.warning('Fail !');
              this.getListOrder(this.getRequest());
            }
          }
        )
      }
    });
  }

  showDetail(hd: any) {
    this.isDisplay = true;
    this.orderInfo = hd;
    this.listProductCart = JSON.parse(hd.order_item);
  }

  orderID: any;
  showEdit(hd: any) {
    this.colorInput = null;
    this.orderID = hd.order_id;
    this.isEdit = true;
    this.orderInfo = hd;
    this.listProductCart = JSON.parse(hd.order_item);
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isDisplay = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isDisplay = false;
    this.isEdit = false;
  }

  sumCart() {
    this.total = 0;
    this.listProductCart.forEach((data: any) => {
      this.total += data.price * data.amountCart;
    });
  }

  updateItem() {
    if (!this.listProductCart) {
      this.toastr.warning('Bạn chưa chọn sản phẩm');
    }
    this.sumCart();
    var req = {
      Order: {
        order_id: this.orderID,
        order_item: JSON.stringify(this.listProductCart),
      },
    }
    this.orderService.updateOrder(req).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.toastr.success('Cập nhật thành công');
          this.getListOrder(this.getRequest());
          window.location.reload();
          this.handleCancel();
        }
        else {
          this.toastr.warning('Thất bại');
        }
      }
    );
  }

  filter() {
    var req = {
      status: this.selectedStatus,
    }
    this.productService.getOrderByFilter(req).subscribe(
      (res) => {
        this.listOrder = res.data;
      }
    );
  }

  search() {
    this.getListOrder(this.getRequest());
  }

  setDisplayEdit(order: any): boolean {
    this.selected_ID = order.order_id;
    if ((order.status == 3) || (order.status == 4)) {
      return false;
    }
    return true;
  }

  addToCart(): boolean {
    if (this.product_code) {
      this.productFilter = this.listAllProduct.filter((x: any) => x.product_code == this.product_code);
    }
    if (this.product_name) {
      this.productFilter = this.listAllProduct.filter((x: any) => x.product_name.toLowerCase().includes(this.product_name));
    }
    if (this.size_search) {
      this.productFilter = this.listAllProduct.filter((x: any) => x.size == this.size_search);
    }
    if (this.colorInput) {
      this.productFilter = this.listAllProduct.filter((x: any) => x.color == this.colorInput);
    }
    let listAttributeCartId = this.listProductCart.map((x: any) => x.product_attribue_id) ?? [];
    for (let att of this.productFilter) {
      if (!listAttributeCartId.includes(att.product_attribue_id)) {
        if (this.productFilter) {
          this.productFilter.forEach((p: any) => {
            p.amountCart = 1;
            p.totalPayment = 0;
            p.totalPayment = (p.price * p.amountCart);
            this.listProductCart.push(p);
          })
          this.toastr.success('Thêm sản phẩm thành công')
        }
        else {
          this.toastr.warning('Không tìm thấy sản phẩm nào phù hợp');
        }
      }
      else {
        this.toastr.warning('Sản phẩm này đã được thêm');
      }
    }
    return true;
  }

  deleteCart(data: any): void {
    this.modal.confirm({
      nzTitle: '<i>Bạn có chắc muốn xóa sản phẩm này?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.listProductCart = this.listProductCart.filter((x: any) => x.product_attribue_id != data.product_attribue_id);
      }
    });
  }

  getAmountStock(data: any) {
    return this.listAllProduct.filter((x: any) => x.product_attribue_id == data.product_attribue_id)[0].amount ?? 0;
  }

  checkAmount(data:any) {
    if (this.listAllProduct.filter((x: any) => x.product_attribue_id == data.product_attribue_id)[0].amount - data.amountCart < 0) {
      this.toastr.warning('Số lượng sản phẩm cần mua đã vượt quá số lượng trong kho');
      data.amountCart = 1;
    }
  }
}
