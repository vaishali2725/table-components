import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }

  getUsersData(){
    return this.http.get<any>('./assets/users.json').pipe( 
      map( res => { return res; }) 
    );
  }
}
