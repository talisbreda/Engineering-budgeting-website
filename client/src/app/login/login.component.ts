import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges, DoCheck,
AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnDestroy {

  @Input('destroyLogin') loginExists!: boolean
  @Output() destroyLogin = new EventEmitter()
  @ViewChild('loginButton') loginButton!: ElementRef
  @ViewChild('emailInput') email!: ElementRef
  @ViewChild('passwordInput') password!: ElementRef

  BASE_URL: string = 'http://localhost:1337'


  async login() {

    const todo = {
      email: this.email.nativeElement.value,
      senha: this.password.nativeElement.value
    }

    try {
      let response = await axios.post(`${this.BASE_URL}/login`, todo)
      alert(`Login successful, user: ${response.data.user.id_usuario}`)
    } catch (e) {
      alert("Unauthorized")
      console.error
    }
  }

  redirectRegister() {
    this.loginExists = false;
    console.log("Login exists: " + this.loginExists)
    this.destroyLogin.emit(this.loginExists)
  }

  constructor() {}


  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngDoCheck(): void {}
  ngAfterContentChecked(): void {}
  ngAfterViewChecked(): void {}
  ngAfterContentInit(): void {}
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}
}
