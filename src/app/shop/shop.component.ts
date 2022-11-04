import { NgModule } from '@angular/core';
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
  sortSelected = 'name';
  sortOptions = [
    {name: 'Aphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
  ];


  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.brandSelectedId, this.typeSelectedId, this.sortSelected)
    .subscribe((response:any) => {
      this.products = response.data;
      console.log(this.products)
    }, (error) => {
      console.log(error)
    })
  }

  getBrands(){
    this.shopService.getBrands().subscribe((response: any) => {
      this.brands = [{id: 0, name: 'All'}, ... response];
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

  onBrandSelected(brandId: number){
    this.brandSelectedId = brandId;
    this.getProducts();
  }

  onTypeSelected(TypeId: number){
    this.typeSelectedId = TypeId;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.sortSelected = sort;
    this.getProducts();
  }
}
