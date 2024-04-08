import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  serverUrl="http://localhost:8080"

  constructor(private http : HttpClient){ };

  getRoles(){
    return this.http.get(`${this.serverUrl}/auth/roles`)
  }

  deleteRole(id:number): Observable<any>{
    return this.http.delete(`${this.serverUrl}/auth/roles/${id}`)
  }

  updateRole(roleId:number,roleData:any){
    return this.http.put(`${this.serverUrl}/auth/roles/${roleId}`, roleData);
  }

  getRolesOfUser(){
    return this.http.get(`${this.serverUrl}/auth/getRolesOfUser`)
  }

  addNewRole(roleDetails:any){
    return this.http.post(`${this.serverUrl}/auth/roles/add`,roleDetails)
  }
}
