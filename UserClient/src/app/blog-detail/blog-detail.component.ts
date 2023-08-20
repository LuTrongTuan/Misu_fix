import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent  extends BaseComponent implements OnInit {

  b_id: any;
  blog: any;

  ngOnInit(): void {
    this.b_id = this.route.snapshot.paramMap.get('id');
    this.getBlogById();
  }

  getBlogById() {
    this.blogService.fintById(this.b_id).subscribe(
      (res) => {
        this.blog = res.data;
      }
    );
  }

}
