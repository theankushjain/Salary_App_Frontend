import { RolesService } from './../../services/roles.service';
import { UsersService } from './../../services/users.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private usersService:UsersService, private rolesService:RolesService){}
 
  getUsers(){
    return this.usersService.getUser().subscribe({
      next : (response) => {
        console.log(response);
      },
      error: (error) =>{
        console.log(error);
      }
  });
  }

  getRoles(){
    return this.rolesService.getRoles().subscribe({
      next: (response)=>{
        console.log(response);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
