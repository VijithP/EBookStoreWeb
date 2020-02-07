import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LoginComponent} from './login/login.component';
import{MyorderComponent} from './myorder/myorder.component';
import{ViewbookComponent} from './viewbook/viewbook.component';
import{AddtocartComponent} from './addtocart/addtocart.component'
import { componentFactoryName } from '@angular/compiler';
import { AuthGuard } from './auth/auth-guard';


export const routes: Routes = [  
  {
    path: '', component: LoginComponent
  },
  {
    path: 'logout', component: LoginComponent
  },
  { 
    path: 'myorder', component:MyorderComponent,canActivate: [AuthGuard]
  },
  { 
    path: 'bookdetails', component: ViewbookComponent,canActivate: [AuthGuard]
  } ,
  {
    path:'addtocart',component:AddtocartComponent,canActivate: [AuthGuard]
  } 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent=[LoginComponent,ViewbookComponent,MyorderComponent,AddtocartComponent];