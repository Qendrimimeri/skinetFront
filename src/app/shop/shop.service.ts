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

  getProducts(brandId?: number, typeId?: number, sort?: string){

    let params = new HttpParams();
    if(brandId) { params = params.append('brandId', brandId.toString()) }
    if(typeId) { params = params.append('typeId', typeId.toString()) }
    if(sort) { params = params.append('sort', sort) }

    return this.http.get<IPagination>(this.baseUrl+"products", {observe: "response", params})
    .pipe(
      map(response => {
        return response.body
      })
    );
  }

  getBrands(){
    return this.http.get(this.baseUrl+"products/brands")
  }

  getTypes(){
    return this.http.get(this.baseUrl+"products/types")
  }
}
