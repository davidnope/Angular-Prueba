import { Input, Output, EventEmitter, Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/models/Users';
import { ShoppingCardService } from 'src/app/service/shopping-card.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  animationMain : boolean = false;
  counterCart = 0;
  //Usuario logeado
  usuarioLogeado:Users = {
    id:0,
    name: "",
    email: "",
    password: "",
  }

  private sub$!: Subscription;

  @Output() estadoProductosEvent = new EventEmitter<boolean>();
  @Output() estadoUsuariosEvent = new EventEmitter<boolean>();

  //#region Metodos para eventos
  despliegueMain(){
    this.animationMain = !this.animationMain;
  }
  
  cerrarMain(){
    this.animationMain = !this.animationMain;
  }

  estadoP(){
    this.estadoProductosEvent.emit(true);
    this.estadoUsuariosEvent.emit(false);
  }
  estadoU(){
    this.estadoProductosEvent.emit(false);
    this.estadoUsuariosEvent.emit(true);
  }
  
  //#endregion Metodos para eventos

  constructor(
    private shoppingCardService : ShoppingCardService,
    private authService : AuthService
    ) 
  { }

  ngOnInit(): void {
    this.sub$ = this.shoppingCardService.myCart$
    .subscribe(products =>{
      this.counterCart = products.length
    });
    this.authService.usuarioLogin$
    .subscribe(usuario => this.usuarioLogeado = usuario)
  }

  ngOnDestroy(): void{
    this.sub$.unsubscribe()
  }

}