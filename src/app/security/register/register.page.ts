import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators , FormControl } from '@angular/forms';
import { Account } from '../../classes/account';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor() {
  }
  ngOnInit() {
  }
  onSubmit(registro: FormData) {
    console.log(registro);
  }
}
