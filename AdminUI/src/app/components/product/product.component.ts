import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends BaseComponent implements OnInit {

  sizeSelected: any;
  SKU_code: any;
  size: NzSelectSizeType = 'default';
  multipleValue = [];
  sizeUpdate: any = '';
  newSize: any;
  newColor: any;
  selectedPrice: any = '';
  selectedBrand: any = '';
  selectedCate: any = '';
  selectedIndex: any;
  isEdit: any = false;

  checkboxForm = [
    {
      id: 1,
      name: 'Female',
      check: false
    },
    {
      id: 2,
      name: 'Male',
      check: false
    },
    {
      id: 3,
      name: 'Both',
      check: false
    },
  ];

  getRequest() {
    return {
      product_code: this.product_code_search ?? '',
      product_name: this.product_name_search ?? '',
      category_id: this.category_search ?? null,
      brand_id: this.brand_search ?? null
    }
  }

  AddForm = new FormGroup({
    // amount: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]),
    brand_id: new FormControl(null, [Validators.required]),
    category_id: new FormControl(null, [Validators.required]),
    // gender: new FormControl(null),
    origin: new FormControl(null, [Validators.required]),
    // price: new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]),
    product_name: new FormControl('', [Validators.required]),
    // size: new FormControl(''),
    status: new FormControl(1),
  })

  ngOnInit(): void {
    this.getListProduct(this.getRequest());
    this.getListCate();
    this.getListBrand();
    this.getProductImage();
    this.getAttribute();
    for (let i = 2; i <= 30; i++) {
      var _img = {
        img: `/assets/images/${i}.jpg`,
        checked: false
      };
      this.listIndexImage.push(_img);
    }
  }

  editProduct() {
    this.isEdit = !this.isEdit;
    this.filterAttribute();
  }

  saveChange(data: any) {
    data.product_attribue_id = data.product_attribute_id;
    this.productService.insertAttribute(data).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Cập nhật thành công');
        }
        else {
          this.toastr.warning('Cập nhật thất bại');
        }
      }
    );
  }

  addAttribute() {
    if (!this.sizeSelected || !this.colorInput || !this.priceInput || !this.amountInput) {
      this.toastr.warning('Bạn cần nhập đầy đủ thông tin');
    }
    else {
      let req = {
        size: this.sizeSelected,
        color: this.colorInput,
        price: this.priceInput,
        product_id: this.selected_ID,
        amount: this.amountInput
      };
      this.productService.getListAll().subscribe(
        (res) => {
          this.listAllProduct = res.data;
          if (this.listAllProduct.filter((x: any) => x.size == req.size && x.color == req.color).length > 0) {
            this.toastr.warning('Sản phẩm này đã được thêm màu và size');
            return false;
          }
          else {
            this.productService.insertAttribute(req).subscribe(
              (res) => {
                if (res.status == 200) {
                  this.toastr.success('Thành công');
                  this.getAttributeByProduct();
                }
                else {
                  this.toastr.success('Thất bại');
                }
              }
            );
            return true;
          }
        }
      )
    }
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.productService.delete(id).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Delete Success !');
              this.getListProduct(this.getRequest());
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListProduct(this.getRequest());
            }
          }
        )
      }
    });
  }

  showConfirmAttribute(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.productService.deleteAttribute(id).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Delete Success !');
              this.getAttributeByProduct();
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getAttributeByProduct();
            }
          }
        )
      }
    });
  }

  showAttribute(dataEdit: any): void {
    this.selected_ID = dataEdit.product_id;
    this.isDisplayAttribute = true;
    this.productService.getImage().subscribe(
      (res) => {
        this.listImage = res.data.filter((x: any) => x.product_id == this.selected_ID);
        this.listImageString = this.listImage.map((x: any) => x.image);
        this.listIndexImage.forEach((c: any) => {
          c.checked = this.listImageString.includes(c.img);
        })
      }
    )
    this.getAttributeByProduct();
  }

  showAddModal(title: any, dataEdit: any): void {
    this.isDisplay = true;
    this.titleModal = title;
    this.selected_ID = 0;
    if (dataEdit != null) {
      this.selected_ID = dataEdit.product_id;
      this.AddForm.patchValue({
        // amount: !dataEdit ? '' : dataEdit.amount,
        brand_id: !dataEdit ? '' : dataEdit.brand_id,
        category_id: !dataEdit ? '' : dataEdit.category_id,
        // gender: !dataEdit ? '' : dataEdit.gender,
        origin: !dataEdit ? '' : dataEdit.origin,
        product_name: !dataEdit ? '' : dataEdit.product_name,
        // price: !dataEdit ? '' : dataEdit.price,
        status: !dataEdit ? 1 : dataEdit.status,
        // size: dataEdit.size ?? '',
      });
      this.sizeInput = dataEdit.size ?? '';
      this.colorInput = dataEdit.color ?? '';
      this.SKU_code = dataEdit.product_code;
    }
    else {
      this.AddForm.reset();
      this.sizeInput = '';
      this.colorInput = '';
      this.AddForm.patchValue({
        status: 1,
      });
      this.SKU_code = btoa(Math.random().toString()).slice(0, 5);
    }
  }

  listImageString: any;
  showImageModal(id: any): void {
    this.isDisplayImage = true;
  }

  showDetailModal(id: any): void {
    this.isDisplayDetail = true;
    this.selected_ID = id;
  }

  showColorModal(id: any): void {
    this.isDisplayColor = true;
    this.selected_ID = id;
  }

  handleOk(): void {
    if (this.AddForm.valid) {
      var req = {
        product_id: this.selected_ID,
        product_code: this.SKU_code,
        // amount: this.AddForm.value.amount,
        brand_id: this.AddForm.value.brand_id,
        category_id: this.AddForm.value.category_id,
        // gender: this.AddForm.value.gender,
        origin: this.AddForm.value.origin,
        product_name: this.AddForm.value.product_name,
        status: this.AddForm.value.status,
        // price: this.AddForm.value.price,
        size: this.sizeSelected,
        color: this.colorInput
      }

      this.productService.save(req).subscribe(
        (res) => {
          if (res.status == 200) {
            this.toastr.success('Success !');
            this.handleCancel();
            this.getListProduct(this.getRequest());
          }
          else {
            this.toastr.success('Fail !');
          }
        }
      );
    } else {
      this.AddForm.markAllAsTouched();
      Object.values(this.AddForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onItemChange(value: any) {
    console.log(" Value is : ", value);
  }

  handleCancel(): void {
    this.modal.closeAll();
  }

  addSize() {
    if (!this.newSize) {
      this.toastr.warning('Bạn cần nhập size');
    }
    else {
      if (this.listOfOption.filter((x: any) => x == this.newSize).length > 0) {
        this.toastr.warning('Kích cỡ này đã được thêm');
      }
      else {
        this.listOfOption.push(this.newSize);
      }
    }
  }

  addColor() {
    if (this.listOfOptionColor.filter((x: any) => x == this.newColor).length > 0) {
      this.toastr.warning('Màu này đã được thêm');
    }
    else {
      this.listOfOptionColor.push(this.newColor);
    }
  }

  filter() {
    var req = {
      fitlerPrice: this.selectedPrice,
      brand_id: this.selectedBrand,
      category_id: this.selectedCate
    }
    this.productService.getByFilter(req).subscribe(
      (res) => {
        this.listProduct = res.data;
      }
    );
  }

  addProductImage() {
    let req = {
      product_id: this.selected_ID,
      list_image_checked: this.listIndexImage.filter((x: any) => x.checked == true).map((x: any) => x.img)
    }
    this.productService.saveProductImage(req).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.toastr.success('Thêm mới ảnh cho sản phẩm thành công');
        }
        else {
          this.toastr.warning('Thất bại');
        }
      }
    );
  }

  search() {
    this.getListProduct(this.getRequest());
  }

  filterAttribute() {
    this.listAttribute = this.listAttributeFilter;
    if (this.size_search) {
      this.listAttribute = this.listAttributeFilter.filter((x: any) => x.size == this.size_search);
    }
    if (this.color_search) {
      this.listAttribute = this.listAttributeFilter.filter((x: any) => x.color == this.color_search);
    }
  }
}
