import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataSource:any = 'localhost:1337/get/all'
  displayedColumns = ['name', 'category']

  constructor() {}

  ngOnInit(): void {
  }

}
