import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
//Modelos
import { Users, CrearUsersDto, LoginUsersDto} from '../../models/Users';
//Servicios
import { UsersService } from '../../service/users.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  //Objeto para crear usuario
  objUsuarioCrear:CrearUsersDto = {
    name: "",
    email: "",
    password: "",
  }
  //Objeto para login usuario
  objUsuarioLogin:LoginUsersDto = {
    email: "",
    password: "",
    }

  //Crear
  inputNombreCr = "";
  inputCorreoCr = "";
  inputContrasenaCr = "";
  //Crear

  //Login
  inputCorreoLg = "";
  inputContrasenaLg = "";
  //Login

  //Usuario logeado
  usuarioLogeado:Users = {
    id:0,
    name: "",
    email: "",
    password: "",
  }

  ///Eventos 
  // Evento para crear usuario
  submitCrearUsuario(){
    console.log(this.inputNombreCr, this.inputCorreoCr, this.inputContrasenaCr);
    this.objUsuarioCrear = {
      name: this.inputNombreCr,
      email: this.inputCorreoCr,
      password: this.inputContrasenaCr,
    }
    this.usuarioService.crear(this.objUsuarioCrear)
    .subscribe(data => console.log(data), err =>{console.log(err);
    });
  }

  // Evento para para login
  submitLogin(){
    console.log(this.inputCorreoLg, this.inputContrasenaLg);
    this.objUsuarioLogin = {
      email: this.inputCorreoLg,
      password: this.inputContrasenaLg
    }
    this.athService.autenticarUsuario(this.objUsuarioLogin)
    .pipe(
      switchMap(token => this.athService.autenticarLogin(token))
    ).subscribe(usuario =>{
      // Guardar usuario para variable global
      this.athService.guardarUsuarioLogin(usuario)
    })
  }

  constructor(
    private usuarioService: UsersService,
    private athService : AuthService
    ) { }

  ngOnInit(): void {
    this.athService.usuarioLogin$
    .subscribe(data => this.usuarioLogeado = data)
  }

}
