import { Injectable } from '@angular/core';
//HttpErrorResponse - Campurar errores
//HttpErrorResponse - Tipos de errores
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

import { retry, catchError } from 'rxjs/operators';

// Modelos
import { Product, NuevoProductoDto, ActualizarProductoDto } from '../models/Product';
import { throwError } from 'rxjs';

//APIS
// https://fakestoreapi.com/products
// https://young-sands-07814.herokuapp.com/docs/#/products/ProductsController_getAll


// APIS CORRECTAS
// https://young-sands-07814.herokuapp.com/docs/#/
// https://damp-spire-59848.herokuapp.com/docs/#

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = "https://young-sands-07814.herokuapp.com/api/products"
  urlCategoria = "https://young-sands-07814.herokuapp.com/api/categories"

  constructor(
    private peticionHttp : HttpClient
  ) { }

  // CRUD COMPLETO
  // Consumo GET Api para conseguir listado de productos
  listaProductosApi(limit?:number, offset?:number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params =  params.set('offset', offset);
    }
    return this.peticionHttp.get<Product[]>(this.url, {params})
    .pipe(
      retry(2)
    )
  }
  // limit y offset
  listaProductosLimitadoApi(limit:number, offset:number){
    return this.peticionHttp.get<Product[]>(this.url, {params: {limit, offset}})
    .pipe(
      retry(2)
    )
  }
  
  listaCategoria(idCategory:string|null, limit:number, offset:number){
    return this.peticionHttp.get<Product[]>(`${this.urlCategoria}/${idCategory}/products`, {params: {limit, offset}})
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError('Algo salio mal al cargar las categorias')
      })
    )
  }

  // Consumo GET Api para conseguir un producto por id
  // Capturar un error depende de los status, 
  product(id : number){
    return this.peticionHttp.get<Product>(`${this.url}/${id}`)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status == HttpStatusCode.NotFound){
          return throwError('No existe este producto')
        }
        return throwError('Algo salio mal')
      })
    )
  }

  // Agregar producto
  agregar(productoAgregadoDto : NuevoProductoDto){
    return this.peticionHttp.post<Product>(this.url, productoAgregadoDto)
  }
  // Actualizar producto
  actualizar(id: number, productoActualizadoDto: ActualizarProductoDto) {
    return this.peticionHttp.put<Product>(`${this.url}/${id}`, productoActualizadoDto)
  }
  // Borrar producto
  borrar(id: number) {
    return this.peticionHttp.delete<Product>(`${this.url}/${id}`)
  }
  
}