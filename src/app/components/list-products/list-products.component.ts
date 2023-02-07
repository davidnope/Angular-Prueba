import { Component, OnInit, OnDestroy,ViewEncapsulation } from '@angular/core';
import { catchError, of, Subscription, throwError } from 'rxjs';

// Modelos
import { Product } from '../../models/Product';
// Servicios
import { ProductsService } from '../../service/products.service';
import { ShoppingCardService } from 'src/app/service/shopping-card.service';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListProductsComponent implements OnInit, OnDestroy{

  // Lista de productos - API
  listProducts : Product[] = [];

  // Lista seleccionada para el carrito de compras
  listShoppingCart : Product[] = this.shoppingCardService.getShoppingCart();

  // Estado del detalle producto
  detailProduct = false;

  //Suscribe de servicePorduct
  serviceProductSuscribe : Subscription = new Subscription();


    productDetail:Product = {
    id: 0,
    title: "",
    price: 0,
    images: [""],
    description: "",
    category: {
      id: 0,
      name: "",
      typeImg: ""
    } 
  };

    resetDetail:Product = {
    id: 0,
    title: "",
    price: 0,
    images: [""],
    description: "",
    category: {
      id: 0,
      name: "",
      typeImg: ""
    } 
  };
  //#region [OUTPUTS]
  // Agregar producto seleccionado desde el componente Producto 
  productShoppingAdd(productSelect : Product){
    this.listShoppingCart.push(productSelect)
    console.log(this.listShoppingCart);
  }

  // Buscar producto por ID que proviene del hijo
  productdetailAdd(id: number){
    this.serviceProduct.product(id)
    .subscribe(data =>{
      this.productDetail = data;
      this.despliegueDetail()
    });
  }
  //#endregion [OUTPUTS]

  //#region [EVENTOS]
    despliegueDetail(){
      this.detailProduct = !this.detailProduct;
      console.log(this.productDetail);
    }

    closeDetail(){
      this.detailProduct = false
      console.log(this.productDetail);
      this.productDetail = this.resetDetail
      console.log(this.productDetail);
    }
  //#endregion [EVENTOS]

  //CONSTRUCTOR 
  constructor(
    private serviceProduct : ProductsService, private shoppingCardService : ShoppingCardService
  ) { }



  ngOnInit(): void {
    //Consumo api para lista de productos
    this.serviceProductSuscribe = this.serviceProduct.listaProductosApi()
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
  }

  ngOnDestroy(): void {
    this.serviceProductSuscribe.unsubscribe();
  }
}