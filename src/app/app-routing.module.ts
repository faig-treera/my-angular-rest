import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { MyaccountComponent } from './pages/myaccount/myaccount.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'about',
    component: AboutComponent,


  },

  {
    path: 'myaccount',
    component: MyaccountComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    

  },

  
  {
    path: 'register',
    component:RegisterComponent,
    

  },
  { path: '**', redirectTo: '/' }, //default sehifesine yoneltmek ucun.Hec bir sehife tapmadisa home gedecek
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
