import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IPagination } from '../models/Paginaton';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl: string = "https://localhost:44303/api/"
  constructor(private http: HttpClient) { }

  getProducts(brandId?: number, typeId?: number){
    let params = new HttpParams();

    if (brandId) {
      params.append('brandId', brandId.toString())
    }

    if (typeId) {
      params.append('typeId', typeId.toString())
    }

    return this.http.get<IPagination>(this.baseUrl+"products", {observe: "response", params})
    .pipe(
      map(response => {
        return response.body
      })
    );
  }

  getBrands(){
    return this.http.get<IPagination>(this.baseUrl+"products/brands")
  }

  getTypes(){
    return this.http.get<IPagination>(this.baseUrl+"products/types")
  }
}
