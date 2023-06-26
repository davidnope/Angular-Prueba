import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Modelos
import { LoginUsersDto, Users } from '../models/Users'
import { AuthToken } from '../models/Auth'
import { catchError, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario:Users ={
    id: 0,
    email: "",
    name: "",
    password: "",
  }
  // Crear un Observable para guardar el usurio logeado
  private usuarioLogin = new BehaviorSubject<Users>(this.usuario);
  usuarioLogin$ = this.usuarioLogin.asObservable();

  url = "https://young-sands-07814.herokuapp.com/api/auth"

  constructor(private peticionHttp : HttpClient) { }

  // Autentica usuario y genera token
  autenticarUsuario(dto: LoginUsersDto){
  return this.peticionHttp.post<AuthToken>(`${this.url}/login`, dto)
  }

  // Autentica el token y trae el usuario
  autenticarLogin(token: AuthToken){
    console.log(token);
    console.log('Validar token');
  return this.peticionHttp.get<Users>(`${this.url}/profile`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    }
  })
  }

  //Obtener usuario logeado y generar un observable
  guardarUsuarioLogin(usuario : Users){
    this.usuarioLogin.next(usuario);
  }
}