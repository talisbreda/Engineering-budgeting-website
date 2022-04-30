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

    const nameValue = this.name.nativeElement.value
    const emailValue = this.email.nativeElement.value
    const passwordValue = this.password.nativeElement.value
    const confirmationValue = this.confirmation.nativeElement.value

    const todo = {
      nome: nameValue,
      email: emailValue,
      senha: passwordValue
    }

    if (nameValue.length > 0) {
      if (emailValue.includes('@', '.com')) {
          if (emailValue.length > 6) {
              if (passwordValue == confirmationValue) {
                  if (passwordValue.length >= 6) {
                      if (passwordValue.length <= 18) {
                        try {
                          const response = await axios.post(`${this.BASE_URL}/register`, todo)
                          alert(`User ${todo.nome} was successfully registered`)
                        } catch {
                          alert("This e-mail is already registered")
                          console.error
                        }
                      } else {
                          alert('Password is too long (maximum of 18 characters');
                      }
                  } else {
                      alert('Password is too short (minimum of 6 characters)');
                  }
              } else {
                  alert('Passwords do not correspond');
              }
          } else {
              alert('E-mail is not valid');
          }
      } else {
          alert('E-mail is not valid');
      }
    } else {
      alert('Name is too short');
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
