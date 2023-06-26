import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService{

    // Reactividad básica
    private myCart = new BehaviorSubject<Product[]>([]);
    myCart$ = this.myCart.asObservable();

    // Lista de productos - API
    private listProducts : Product[] = [];

  constructor() { }

  // Agregar producto seleccionado a la lista del carrito
    productShoppingAdd(productSelect : Product){
    this.listProducts.push(productSelect)
    this.myCart.next(this.listProducts)
  }

  // obtener carrito de compras
  getShoppingCart(){
    return this.listProducts
  }
}
