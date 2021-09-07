import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;
  returnUrl: string;

  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/shop'
    this.createLoginForm();
  }

  createLoginForm() {
    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.accountService.login(this.logInForm.value).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    }, error => {
      console.log(error);
    });
  }

}
