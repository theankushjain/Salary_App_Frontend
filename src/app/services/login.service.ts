import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  serverUrl = "http://localhost:8080"

  constructor(private http:HttpClient) { }

  //calling the server to generate token
  generateToken(credentials:any){
    return this.http.post(`${this.serverUrl}/auth/generateToken`,credentials)
  }

  //logging in the user after credentials found correct
  loginUser(token: string){
    localStorage.setItem("token",token)
    return true;
  }

  //to check if some user is loggin in or not i.e if the session is running
  isLoggedIn(){
    let token=localStorage.getItem("token");
    if(token==undefined || token=='' || token==null){
      return false;
    }else{
      return true;
    }
  }

  //to logout any user i.e. to remove session
  logout(){
    localStorage.removeItem("token");
    return true;
  }

  //to get the token of logged in user
  getToken(){
    return localStorage.getItem("token");
  }
}
