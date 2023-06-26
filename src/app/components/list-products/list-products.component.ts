import { Component, Input, Output, EventEmitter, OnInit, OnDestroy,ViewEncapsulation } from '@angular/core';
import { catchError, of, Subscription, throwError } from 'rxjs';

// Modelos
import { Product, NuevoProductoDto, ActualizarProductoDto } from '../../models/Product';
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
  @Input() listProducts : Product[] = [];

  @Output() loadMore = new EventEmitter();


  // Lista seleccionada para el carrito de compras
  listShoppingCart : Product[] = this.shoppingCardService.getShoppingCart();

  // Estado del detalle producto
  detailProduct = false;

  //Suscribe de servicePorduct
  serviceProductSuscribe : Subscription = new Subscription();

  // limit y offset
  limit = 6;
  offset = 0;

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

    reset:Product = {
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
    // this.listShoppingCart.push(productSelect)
    console.log(this.listShoppingCart);
  }

  // Buscar producto por ID que proviene del hijo
  // Capturar un error del servicio
  productdetailAdd(id: number){
    this.serviceProduct.product(id)
    .subscribe(data =>{
      this.productDetail = data;
      this.despliegueDetail()
    }, error => console.log(error));
  }
  //#endregion [OUTPUTS]

  //#region [EVENTOS]
    despliegueDetail(){
      this.detailProduct = !this.detailProduct;
    }

    closeDetail(){
      this.detailProduct = false
      this.productDetail = this.reset
    }
    //AGREGAR - LA LISTA DE PRODCUTOS
    recargarListaEmit(){ 
      this.loadMore.emit();
    }
  //#endregion [EVENTOS]

  //CONSTRUCTOR 
  constructor(
    private serviceProduct : ProductsService, private shoppingCardService : ShoppingCardService
  ) { }

  //Peticiones CRUD
  //#region [Peticiones CRUD]

    agregarProducto(){
      let productoNuevo : NuevoProductoDto = {
        title: "NUEVO",
        price: 1111111,
        images: ['https://placeimg.com/640/480/any'],
        description: "NUEVO PRODUCTO",
        categoryId: 1,
      }
      this.serviceProduct.agregar(productoNuevo)
      .subscribe(data => this.listProducts.unshift(data));
    }

    actualizarProducto(){
      let productoActualizar : ActualizarProductoDto = {
        title: "Actualizando",
        price: 888,
        images: ['https://placeimg.com/640/480/any'],
        description: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        categoryId: 2,
      }
      this.serviceProduct.actualizar(this.productDetail.id, productoActualizar)
      .subscribe(data => {
        let indice = this.listProducts.findIndex(x=> x.id === data.id);
        this.listProducts[indice] = data;
        this.detailProduct = false;
        productoActualizar = this.reset
      })
    }

    eliminarProducto(){
        this.serviceProduct.borrar(this.productDetail.id)
        .subscribe(data =>{
          let indice = this.listProducts.findIndex(x=> x.id === data.id);
          this.listProducts.splice(indice, 1)
          this.detailProduct = false
        })
    }

  //#endregion [Peticiones CRUD]
  //Peticiones CRUD

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('Se borro');
  }
}