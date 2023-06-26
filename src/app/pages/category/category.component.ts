import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router'

import { ProductsService } from '../../service/products.service'
import { Product } from 'src/app/models/Product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryId : string | null = null;

    // Lista de productos - API
    listProducts: Product[] = [];
    // limit y offset
    limit = 6;
    offset = 0;
    
  constructor(
    private route : ActivatedRoute,
    private productsService : ProductsService

  ) { }

  ngOnInit(): void {

    this.route.paramMap
    .pipe(
      switchMap(params =>{
        this.categoryId = params.get('id');
        if(this.categoryId){
        return this.productsService.listaCategoria(this.categoryId, this.limit, this.offset)
        }
        return []
      })
    ).subscribe(result =>{
      this.listProducts = result
    })

    // this.route.paramMap.subscribe(params => {
    //   this.categoryId = params.get('id');
    //   if(this.categoryId){
    //     this.productsService.listaCategoria(this.categoryId, this.limit, this.offset)
    //     .subscribe(productos => {
    //       this.listProducts = productos
    //       console.log(this.listProducts);
    //     })
    //   }
    // })
    
  }
}
