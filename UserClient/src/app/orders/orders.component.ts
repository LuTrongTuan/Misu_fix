import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent extends BaseComponent implements OnInit {

  orderByAccount: any;
  account_id: any;
  listOrderItem: any;
  orderDetail: any;

  ngOnInit(): void {
    this.account_id = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo')))).account_id;
    this.getListOrderByAccount();
  }

  getListOrderByAccount() {
    this.orderService.getList().subscribe(
      (res) => {
        this.orderByAccount = res.data.filter((x: any) => x.account_id == this.account_id);
        if (this.orderByAccount.length > 0) {
          this.orderByAccount.forEach((x: any) => {
            this.positionService.getListCity().subscribe(
              (res: any) => {
                x.city_name = res.data.filter((c: any) => c.ProvinceID == x.id_city)[0].ProvinceName;
                this.positionService.getListDistrict({ province_id: x.id_city }).subscribe(
                  (res: any) => {
                    x.district_name = res.data.filter((d: any) => d.DistrictID == x.id_district)[0].DistrictName;
                    this.positionService.getListWard({district_id: x.id_district}).subscribe(
                      (res: any) => {
                        x.ward_name = res.data.filter((w: any) => w.WardCode == x.id_ward.toString())[0].WardName;
                      }
                    );
                  }
                );
              }
            );
          })
        }
      }
    )
  }

  closeResult: any;
  open(Data: any) {
    this.orderDetail = Data;
    this.selected_ID = Data.order_id;
    this.submitted = false;
    this.titleModal = 'Chi tiết đơn hàng';
    this.listOrderItem = JSON.parse(JSON.parse(JSON.stringify(Data.order_item)));
  }

  cancleOrder(id: any) {
    this.orderService.cancleOrder(id).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.toastr.success('Successfully !');
          this.getListOrderByAccount();
        }
        else {
          this.toastr.warning('Failed !');
        }
      }
    );
  }

  exportOrder() {
    var mywindow = window.open('', 'my div', 'height=800,width=600');
    mywindow?.document.write('<html><head><title>my div</title>');
    mywindow?.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">');
    mywindow?.document.write('</head><body >');
    mywindow?.document.write('<h2 style="font-weight:bold;text-align:center">DANH SÁCH HÓA ĐƠN</h2>');
    mywindow?.document.write(
      `<table style="width:100%" class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Người nhận</th>
            <th scope="col">Địa chỉ</th>
          </tr>
        </thead>
        <tbody>`);
    for (let i = 0; i <= this.orderByAccount.length; i++) {
      mywindow?.document.write(`
          <tr>
            <th scope="row">`+ (i + 1) + `</th>
            <td style="text-align:center">`+ this.orderByAccount[i]?.created_at + `</td>
            <td style="text-align:center">`+ (this.orderByAccount[i]?.status == 1 ? 'Đang vận chuyển' : 'Đã huỷ') + `</td>
            <td style="text-align:center">`+ this.orderByAccount[i]?.full_name + `</td>
            <td style="text-align:center">`+ `${this.orderByAccount[i]?.city_name} - ${this.orderByAccount[i]?.district_name} - ${this.orderByAccount[i]?.ward_name}` + `</td>
          </tr>
          `);
    }
    (`</tbody></table>`);
    mywindow?.document.write()
    mywindow?.document.write('</body></html>');
    mywindow?.print();
    mywindow?.close();
  }
}
