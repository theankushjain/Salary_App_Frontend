import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  serverUrl="http://localhost:8080"

  constructor(private http : HttpClient){ };

  getMenus(){
    return this.http.get(`${this.serverUrl}/menus/`)
  }

  deleteMenu(id:number): Observable<any>{
    return this.http.delete(`${this.serverUrl}/menus/${id}`)
  }

  updateMenu(menuId:number,menuData:any){
    return this.http.put(`${this.serverUrl}/menus/${menuId}`, menuData);
  }

  addNewMenu(menuDetails:any){
    return this.http.post(`${this.serverUrl}/menus/add`,menuDetails)
  }
} 
