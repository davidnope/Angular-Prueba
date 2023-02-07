import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Modelos
import { Product } from '../models/Product';

//APIS
// https://fakestoreapi.com/products
// https://young-sands-07814.herokuapp.com/docs/#/products/ProductsController_getAll

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  url = "https://young-sands-07814.herokuapp.com/api/products"

  constructor(
    private peticionHttp : HttpClient
  ) { }

  // Consumo GET Api para conseguir listado de productos
  listaProductosApi(){
    return this.peticionHttp.get<Product[]>(`${this.url}?limit=20&offset=0`)
  }
  // Consumo GET Api para conseguir un producto por id
  product(id : number){
    return this.peticionHttp.get<Product>(`${this.url}/${id}`)
  }
}