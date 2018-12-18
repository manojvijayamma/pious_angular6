import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';

import { Tyre } from '../models/tyre.model';

import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";

@Injectable()
export class TyreService {
  readonly rootUrl = `${environment.api_url}`;
  constructor(private http: HttpClient, private router: Router) { }



  getData(searchData){
    
      let params = new HttpParams(); 
      //params=params.append('rowsize', searchData.rowsize);
      //params=params.append('sortField', searchData.sortField);
      for (let key in searchData) {
         params=params.append(key, searchData[key]);
      }           
      return  this.http.get(this.rootUrl+'tyre', {params});
  }

  getDetails(id){
    
    return  this.http.get(this.rootUrl+'tyreDetails/'+id);
  }


  getCategory(){             
    return  this.http.get(this.rootUrl+'category');
  }

  getType(){             
    return  this.http.get(this.rootUrl+'type');
  }

  getBrand(){             
    return  this.http.get(this.rootUrl+'brand');
  }

  getOrigin(){             
    return  this.http.get(this.rootUrl+'origin');
  }

  getModel(){             
    return  this.http.get(this.rootUrl+'model');
  }

  getSize(){             
    return  this.http.get(this.rootUrl+'size');
  }

  updateStock(formData){
    return this.http.post(this.rootUrl+'updateStock' , formData);
  }

  addToCart(formData){
    return this.http.post(this.rootUrl+'cart' , formData);
  }

  sendEnquiry(formData){
    return this.http.post(this.rootUrl+'enquiry' , formData);
  }

 

}
