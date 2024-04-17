import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  serverUrl="http://localhost:8080"

  constructor(private http : HttpClient){ };

  getLocations(){
    return this.http.get(`${this.serverUrl}/location/`)
  }

  deleteLocation(id:number): Observable<any>{
    return this.http.delete(`${this.serverUrl}/location/${id}`)
  }

  updateLocation(locationId:number,locationData:any){
    return this.http.put(`${this.serverUrl}/location/${locationId}`, locationData);
  }

  addNewLocation(locationDetails:any){
    return this.http.post(`${this.serverUrl}/location/add`,locationDetails)
  }
}
