import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm: any;
  loading = false;
  submitted = false;
  returnUrl: string = "";
  userList: User[] = []

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let localUsers = localStorage.getItem('userList');
    if(!localUsers)
    {
      localUsers="[]";
    }
    this.userList=JSON.parse(localUsers);
    this.loginForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    let findId = this.userList.length + 1;
    this.userList.push({ id: findId, firstName: this.f.firstName.value, lastName: this.f.lastName.value, username: this.f.username.value, password: this.f.password.value,isAdmin:false });
    localStorage.setItem('userList', JSON.stringify(this.userList));
    this.router.navigate(['/login']);

  }


}
