import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCardService } from 'src/app/service/shopping-card.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  animationMain : boolean = false;
  counterCart = 0;

  private sub$!: Subscription;

  //#region Metodos para eventos
  despliegueMain(){
    this.animationMain = !this.animationMain;
  }
  
  cerrarMain(){
    this.animationMain = !this.animationMain;
  }
  //#endregion Metodos para eventos

  constructor(private shoppingCardService : ShoppingCardService) 
  { }

  ngOnInit(): void {
    this.sub$ = this.shoppingCardService.myCart$
    .subscribe(products =>{
      this.counterCart = products.length
    })
  }

  ngOnDestroy(): void{
    this.sub$.unsubscribe()
  }

}