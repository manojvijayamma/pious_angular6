import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
import { User } from '../models/user.model';

import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";

@Injectable()
export class UserService {
  readonly rootUrl = `${environment.api_url}`;
  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/api/User/Register', body,{headers : reqHeader});
  }

  userAuthentication(userName, password) {
      var data = '{"email":"'+userName+'" ,"password":"'+password+'"}';
      var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','No-Auth':'True' });
      return this.http.post(this.rootUrl+'login' , data, { headers: reqHeader });
  }

  getDashboardData(){
      return  this.http.get(this.rootUrl+'user');
  }

  getUserData(searchData){
    
    let params = new HttpParams(); 
    params=params.append('rowsize', searchData.rowsize);
    params=params.append('sortField', searchData.sortField);
          
    return  this.http.get(this.rootUrl+'user', {params});
  }


  /*
  checkStatus(error){
    if (error.status === 401) {
        this.router.navigateByUrl('/login');
    }  
  }*/
  

  updateProfile(data){     
      return this.http.post(this.rootUrl+'profile' , data);
  }

  updatePassword(data){     
    return this.http.post(this.rootUrl+'password' , data);
  }

  getProfile(params){
      return  this.http.get(this.rootUrl+'profile', {params});
  }

}
