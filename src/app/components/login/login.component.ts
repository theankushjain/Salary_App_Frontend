import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{



  credentials={
    username:'',
    password:''
  }

  feedback={
    error:''
  }

  constructor(private loginService:LoginService){}
  ngOnInit(): void {
    
  }

  onSubmit() {
   if((this.credentials.username!='' && this.credentials.password!='') && (this.credentials.username!=null && this.credentials.password!=null) ){
    // generating token by sending the credentials to server

    this.loginService.generateToken(this.credentials).subscribe({
      next: (response:any) =>{
        this.loginService.loginUser(response.token);
        window.location.href="/dashboard"
      },
      error: (error) =>{
        console.log(error);
        this.feedback.error='Username or Password Incorrect!'
      }
   });

   }
   else{
    console.log("Fields are Empty")
   }
    }

}
