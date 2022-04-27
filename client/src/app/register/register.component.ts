import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnChanges, DoCheck,
AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit {

  @Input('destroyRegister') registerExists: boolean
  @Output() destroyRegister = new EventEmitter()

  register() {
    console.log("aaaaaaa")
  }

  redirectLogin() {
    this.registerExists = true;
    console.log("Register exists: " + this.registerExists)
    this.destroyRegister.emit(this.registerExists)
  }

  constructor() {
    this.registerExists = false
   }


   ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngDoCheck(): void {}
  ngAfterContentChecked(): void {}
  ngAfterViewChecked(): void {}
  ngAfterContentInit(): void {}
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}

}
