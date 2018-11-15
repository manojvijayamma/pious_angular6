import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';

import { Order } from '../models/order.model';

import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";

@Injectable()
export class OrderService {
  readonly rootUrl = `${environment.api_url}`;
  constructor(private http: HttpClient, private router: Router) { }



  getData(searchData){
    
      let params = new HttpParams(); 
      //params=params.append('rowsize', searchData.rowsize);
      //params=params.append('sortField', searchData.sortField);
      for (let key in searchData) {
         params=params.append(key, searchData[key]);
      }           
      return  this.http.get(this.rootUrl+'order', {params});
  }

  getDetails(id){
      return  this.http.get(this.rootUrl+'order/'+id);
  }

  saveOrder(formData){
      return this.http.post(this.rootUrl+'order' , formData);
  }

  getCart(params){
    return  this.http.get(this.rootUrl+'cart', {params});
  }

 

}
