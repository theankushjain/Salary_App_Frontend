import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  serverUrl="http://localhost:8080"

  constructor(private http : HttpClient){ };

  deleteUser(id:number): Observable<any>{
    return this.http.delete(`${this.serverUrl}/auth/users/${id}`)
  }

  updateUser(userId:number,userData:any){
    return this.http.put(`${this.serverUrl}/auth/users/${userId}`, userData);
  }

  getUser(){
    return this.http.get(`${this.serverUrl}/auth/users`)
  }
}
