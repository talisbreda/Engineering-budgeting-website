import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges, DoCheck,
AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnDestroy {

  @Input('destroyLogin') loginExists: boolean
  @Output() destroyLogin = new EventEmitter()

  login() {
    console.log("aaaaaaa")
  }

  redirectRegister() {
    this.loginExists = false;
    console.log("Login exists: " + this.loginExists)
    this.destroyLogin.emit(this.loginExists)
  }

  constructor() {
    this.loginExists = true;
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
