import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
// import Chart from 'chart.js/auto'

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent extends BaseComponent implements OnInit {

  chart: any;
  total_price: any = 0;
  count_user: any;
  count_product: any;
  transaction: any;

  ngOnInit(): void {
    this.getListAccount(null);
    this.getListProduct(null);
    this.getListOrder(null);
    this.productService.getList(null).subscribe(
      (res) => {
        var total = 0;
        this.listProduct = res.data;
        this.listProduct.forEach((x: any) => {
          if (x.price > 0) {
            total = total + x.price;
          }
        })
        this.total_price = total;
      });
    this.createChart();
  }

  exportExcel() {
    this.excelService.exportAsExcelFile(this.listAccount, 'accounts');
  }

  createChart() {
    // this.orderService.getList(null).subscribe(
    //   (res) => {
    //     this.chart = new Chart("MyChart", {
    //       type: 'bar', //this denotes tha type of chart
    //       data: {// values on X-Axis
    //         labels: res.data.map((x: any) => 'HĐ00' + x.order_id),
    //         datasets: [
    //           {
    //             label: "Thành tiền",
    //             data: res.data.map((x: any) => x.total),
    //             backgroundColor: '#1890ff'
    //           },
    //         ]
    //       },
    //       options: {
    //         aspectRatio: 2.5
    //       }
    //     });
    //     this.productService.getAllAttribute().subscribe(
    //       (res) => {
    //         this.chart = new Chart("MyChart1", {
    //           type: 'doughnut', //this denotes tha type of chart
    //           data: {// values on X-Axis
    //             labels: res.data.map((x: any) => `${x.size} - ${x.color}`),
    //             datasets: [
    //               {
    //                 label: "Giá tiền",
    //                 data: res.data.map((x: any) => x.price),
    //                 backgroundColor: res.data.map((x: any) => x.color)
    //               },
    //             ]
    //           },
    //           options: {
    //             aspectRatio: 2.5
    //           }
    //         });
    //       }
    //     );
    //   }
    // );
  }
}
