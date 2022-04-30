import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, ElementRef, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnChanges, DoCheck,
AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit {

  @Input('destroyRegister') registerExists: boolean
  @Output() destroyRegister = new EventEmitter()
  @ViewChild('nameInput') name!: ElementRef
  @ViewChild('emailInput') email!: ElementRef
  @ViewChild('passwordInput') password!: ElementRef
  @ViewChild('confirmationInput') confirmation!: ElementRef

  BASE_URL: string = 'http://localhost:1337'

  async register() {

    const todo = {
      nome: this.name.nativeElement.value,
      email: this.email.nativeElement.value,
      senha: this.password.nativeElement.value
    }

    console.log("aaaaaaa")
    try {
      let response = await axios.post(`${this.BASE_URL}/register`, todo)
      alert(`User ${todo.nome} was successfully registered`)
    } catch {
      alert("Error register user")
      console.error
    }

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
