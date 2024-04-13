import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './services/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { EmployeemanageComponent } from './components/employeemanage/employeemanage.component';
import { RolemanageComponent } from './components/employeemanage/rolemanage/rolemanage.component';
import { MenumanageComponent } from './components/menumanage/menumanage.component';
import { AddMenuComponent } from './components/menumanage/add-menu/add-menu.component';
import { SalarymanageComponent } from './components/salarymanage/salarymanage.component';
import { AddSalaryComponent } from './components/salarymanage/add-salary/add-salary.component';
import { SingleusersalaryComponent } from './components/salarymanage/singleusersalary/singleusersalary.component';
import { GeneratepayslipComponent } from './components/salarymanage/generatepayslip/generatepayslip.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full',
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'register',
    component:RegisterComponent,
    pathMatch:'full',
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    pathMatch:'full',
    canActivate: [authGuard]
  },
  {
    path:'employee/manage',
    component:EmployeemanageComponent,
    pathMatch:'full',
    canActivate: [authGuard]
  },
  {
    path:'salary/manage',
    component:SalarymanageComponent,
    pathMatch:'full',
    canActivate: [authGuard]
  },
  {
    path:'salary/generate',
    component:GeneratepayslipComponent,
    pathMatch:'full',
    canActivate:[authGuard]
  },
  {
    path:'salary/user',
    component:SingleusersalaryComponent,
    pathMatch:'full',
    canActivate:[authGuard]
  },
  {
    path:'salary/add',
    component:AddSalaryComponent,
    pathMatch:'full',
  },
  {
    path:'role/manage',
    component:RolemanageComponent,
    pathMatch:'full',
    canActivate: [authGuard]
  },
  {
    path:'menu/manage',
    component:MenumanageComponent,
    pathMatch:'full',
    canActivate:[authGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
