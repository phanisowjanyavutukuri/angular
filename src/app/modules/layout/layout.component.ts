import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  title = 'Dashboard';
  collapseSideBar = true;
  constructor() { }

  ngOnInit() {
  }

  dashboardPage(pageurl) {
    this.title = 'Dashboard';
  }

  uncollapseSidebar() {
    this.collapseSideBar = !this.collapseSideBar;
  }

}
