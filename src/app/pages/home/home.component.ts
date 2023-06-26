import { Component, OnInit } from '@angular/core';
import { Subscription, catchError, throwError } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  // Lista de productos - API
  listProducts: Product[] = [];
  // limit y offset
  limit = 6;
  offset = 0;
  constructor(
    private serviceProduct: ProductsService
  ) { }

  //Consumo api para lista de productos
  private listaProductos(limit: number, offset: number) {
    this.serviceProduct.listaProductosLimitadoApi(limit, offset)
      // Editamos el error
      .pipe(
        catchError(err => {
          console.log('Se presento un error', err);
          return throwError(err);
        })
      )
      .subscribe(
        // Captura la respuesta
        res => this.listProducts = res,
        // Captura el error
        err => console.log('HTTP Error', err),
        // Se ejecuta cuando no se presento ningun error
        () => console.log('HTTP request completed.')
      );
  };

  recargarListaLimitada(){
    this.offset = this.listProducts.length - 1
    this.serviceProduct.listaProductosLimitadoApi(this.limit, this.offset)
    // Editamos el error
    .pipe(
      catchError(err => {
        console.log('Se presento un error', err);
        return throwError(err);
      })
    )
    .subscribe(
      // Captura la respuesta
      res =>{
        this.listProducts = this.listProducts.concat(res)
      },
      // Captura el error
      err => console.log('HTTP Error', err),
      // Se ejecuta cuando no se presento ningun error
      () => console.log('HTTP request completed.')
  );
  }

  ngOnInit(): void {
    this.listaProductos(this.limit, this.offset);
  }

}
