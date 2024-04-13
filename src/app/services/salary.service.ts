import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  serverUrl="http://localhost:8080"

  constructor(private http : HttpClient){ };

  // getMenus(){
  //   return this.http.get(`${this.serverUrl}/menus/`)
  // }

  // deleteMenu(id:number): Observable<any>{
  //   return this.http.delete(`${this.serverUrl}/menus/${id}`)
  // }

  // updateMenu(menuId:number,menuData:any){
  //   return this.http.put(`${this.serverUrl}/menus/${menuId}`, menuData);
  // }

  getIndividualSalaries(userId:number){
    return this.http.get(`${this.serverUrl}/salary/${userId}`)
  }

  getCurrentUserSalaries(){
    return this.http.get(`${this.serverUrl}/salary/currentuser`)
  }

  addNewSalary(salaryDetails:any){
    return this.http.post(`${this.serverUrl}/salary/add`,salaryDetails)
  }

  getSalaryById(salaryId:number){
    return this.http.get(`${this.serverUrl}/salary/${salaryId}`)
  }
}
