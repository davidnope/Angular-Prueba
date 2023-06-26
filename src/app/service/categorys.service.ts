import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CategorysService {

  urlCategoria = "https://young-sands-07814.herokuapp.com/api/categories"

  constructor(private httpClient: HttpClient) { }

  traerCategoria(){
    return this.httpClient.get(this.urlCategoria);
  }
}
