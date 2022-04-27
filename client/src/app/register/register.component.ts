import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input('destroyRegister') registerExists: boolean
  @Output() destroyRegister = new EventEmitter()

  register() {
    console.log("aaaaaaa")
  }

  redirectLogin() {
    this.registerExists = true;
    console.log(this.registerExists)
    this.destroyRegister.emit(this.registerExists)
  }

  constructor() {
    this.registerExists = false
   }

  ngOnInit(): void {
  }

}
