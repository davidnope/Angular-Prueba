import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/Product';

import { ShoppingCardService } from "../../service/shopping-card.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  @Input() product:Product = {
    id: 0,
    title: "",
    price: 0,
    images: [""],
    description: "",
    category: {
      id: 0,
      name: "",
      typeImg: ""
    } 
  };

  @Output() productAdd = new EventEmitter<Product>();
  @Output() detailProduct = new EventEmitter<number>();

  //Agregando el prodcuto seleccionado 
  shoppingCartAdd(){
    this.productAdd.emit(this.product);
    this.shoppingCardService.productShoppingAdd(this.product)
  }
  //Activar detalle producto emitiendo el valor al padre
  detailProductAdd(){
    this.detailProduct.emit(this.product.id)
  }

  constructor(private shoppingCardService : ShoppingCardService) 
  { }

  ngOnInit(): void {
  }
}
