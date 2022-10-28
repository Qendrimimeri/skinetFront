import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/Product';
import { ShopService } from './shop.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(private shopService:ShopService ) {}

  title = 'client';
  products: IProduct[] = [];
  brands: any = [];
  types: any = [];
  brandSelectedId!: number;
  typeSelectedId!: number;


  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts().subscribe((response:any) => {
      this.products = response.data;
      console.log(this.products)
    }, (error) => {
      console.log(error)
    })
  }

  getBrands(){
    this.shopService.getBrands().subscribe((response) => {
      this.brands = response;
      console.log(this.products)
    }, (error) => {
      console.log(error)
    })
  }

  getTypes(){
    this.shopService.getTypes().subscribe((response) => {
      this.types = response;
      console.log(this.products)
    }, (error) => {
      console.log(error)
    })
  }
}
