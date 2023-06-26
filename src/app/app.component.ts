import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto-angular';

  apagarLista = true;

  estadoProducto = false;
  estadoUsuario = true;

  listaAdd(){
    this.apagarLista = !this.apagarLista;
  }

  estadoProductoEv(estado:boolean){
    this.estadoProducto = estado;
  }

  estadoUsuarioEv(estado:boolean){
    this.estadoUsuario = estado;
  }
}