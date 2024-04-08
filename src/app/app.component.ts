import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard-app';

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private loginService:LoginService){

  }

  isLoggedIn=this.loginService.isLoggedIn();

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
