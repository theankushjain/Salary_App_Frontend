import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginService } from './services/login.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { authGuard } from './services/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BodyComponent } from './components/body/body.component';
import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { HeaderComponent } from './components/header/header.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkMenuModule} from '@angular/cdk/menu';
import { EmployeemanageComponent } from './components/employeemanage/employeemanage.component';
import { RolemanageComponent } from './components/employeemanage/rolemanage/rolemanage.component';
import { AddRoleComponent } from './components/employeemanage/rolemanage/add-role/add-role.component';
import { MenumanageComponent } from './components/menumanage/menumanage.component';
import { AddMenuComponent } from './components/menumanage/add-menu/add-menu.component';
import { SalarymanageComponent } from './components/salarymanage/salarymanage.component';
import { AddSalaryComponent } from './components/salarymanage/add-salary/add-salary.component';
import { SingleusersalaryComponent } from './components/salarymanage/singleusersalary/singleusersalary.component';
import { GeneratepayslipComponent } from './components/salarymanage/generatepayslip/generatepayslip.component'


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    SidenavComponent,
    SettingsComponent,
    BodyComponent,
    SublevelMenuComponent,
    HeaderComponent,
    EmployeemanageComponent,
    RolemanageComponent,
    AddRoleComponent,
    MenumanageComponent,
    AddMenuComponent,
    SalarymanageComponent,
    AddSalaryComponent,
    SingleusersalaryComponent,
    GeneratepayslipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    OverlayModule,
    CdkMenuModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
  ],
  providers: [LoginService,[{provide : HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}], { provide: MAT_DIALOG_DATA, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
