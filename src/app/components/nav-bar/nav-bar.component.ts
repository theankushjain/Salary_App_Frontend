import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public loggedIn=false;

  constructor(private loginService:LoginService){

  }

  ngOnInit(): void {
    this.loggedIn=this.loginService.isLoggedIn();
  }

  logoutUser(){
    this.loginService.logout();
    location.reload();
  }

}
