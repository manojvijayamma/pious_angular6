import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';

//import { Address } from '../models/address.model';

import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";

@Injectable()
export class AddressService {
  readonly rootUrl = `${environment.api_url}`;
  constructor(private http: HttpClient, private router: Router) { }



  getData(searchData){
    
      let params = new HttpParams(); 
      //params=params.append('rowsize', searchData.rowsize);
      //params=params.append('sortField', searchData.sortField);
      for (let key in searchData) {
         params=params.append(key, searchData[key]);
      }           
      return  this.http.get(this.rootUrl+'address', {params});
  }

  getDetails(id){
    
    return  this.http.get(this.rootUrl+'addressDetails/'+id);
  }

  saveAddress(data){     
    return this.http.post(this.rootUrl+'address' , data);
  }

  getAddressOption(id){
    
    return  this.http.get(this.rootUrl+'addressOption/'+id);
  }

 

}
