
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  serverUrl = "http://localhost:8080"

  constructor(private http:HttpClient) { }

  //calling the server to save new user
  saveCredentials(credentials:any){
    return this.http.post(`${this.serverUrl}/auth/users/add`,credentials)
  }

}
