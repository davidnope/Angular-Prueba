import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

//Modelos
import { Users, CrearUsersDto } from '../models/Users'

import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = "https://young-sands-07814.herokuapp.com/api/users"

  constructor(private peticionHttp : HttpClient) { }

  // Trear todos los usuario existentes
  traerTodos(){
    return this.peticionHttp.get<Users[]>(this.url)
  }

  //Crear un usuario
  crear(dto:CrearUsersDto){
    console.log(dto);
    console.log('Ya para enviar');
    return this.peticionHttp.post<CrearUsersDto>(this.url, dto)
    .pipe(
      catchError(error=> {
        if(!dto.email || !dto.name || !dto.password){
        return throwError('Se debe enviar bien el formulario')
        }
        return throwError('Se presento un error')
      })
    )
  }
}