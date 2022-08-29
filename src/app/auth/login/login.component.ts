import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loading = false;
  submitted = false;
  returnUrl: string = "";
  userList: User[] = [];
  isLogin: Boolean = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('userObj');
    let userStorage = localStorage.getItem('userList');
    if(!userStorage)
    {
      userStorage="[]";
    }
    console.log(userStorage)
    this.userList = JSON.parse(userStorage ?? '[]');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    //this.loading = true;
    let checkUser = this.userList.filter(x => {
      return x.username.toLowerCase() == this.f.username.value.toLowerCase() && x.password == this.f.password.value
    });
    console.log(checkUser)

    if (checkUser.length != 0) {
      let _token = this.generateToken(32);
      let userObj = { id: checkUser[0].id, token: _token };
      localStorage.setItem('userObj', JSON.stringify(userObj))
      this.router.navigate(['/myaccount']);
      this.isLogin = true

    }
    else {
      this.isLogin = false;
    }
    // console.log(checkUser);





  }
  generateToken(n: number) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for (var i = 0; i < n; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  }
}
