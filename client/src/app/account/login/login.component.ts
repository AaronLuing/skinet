import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.logInForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.accountService.login(this.logInForm.value).subscribe(() => {
      console.log('user logged in')
    }, error => {
      console.log(error);
    });
  }

}
