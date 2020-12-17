import { HttpClient } from '@angular/common/http';
import { Component, OnInit , Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input()
  shoppingCart : any = {};

  @Output()
  checkout = new EventEmitter<any>();

  userId = '';
  subtotal : number = 0;
  

  constructor(private http: HttpClient , private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(params => {
          let id = params['id'];
          this.userId = id;          
      });
  };


  quantityChange(event : any , product : any)
  {
    this.subtotal = 0;
    let value = event.target.value;
    this.shoppingCart.forEach((item : any , index : number) => 
    {
        if(item.drugCode == product.drugCode)
        {
          let newItem = {
            drugCode: product.drugCode,
            drugCompany: product.drugCompany,
            drugName: product.drugName,
            image: product.image,
            price: product.price,
            stocks: product.stocks,
            _id: product._id,     
            quantity: value,       
            total: value * product.price,
          };
          this.shoppingCart[index] = newItem;
          this.subtotal += newItem.total
        }else{
          this.subtotal += item.total;
        };        
    });
  };

  updateSubTotal()
  {
    this.subtotal = 0;
    this.shoppingCart.forEach((item : any , index : number) => 
    {
      this.subtotal += item.total
    });
  };

  removeFromCart(product : any)
  {
    this.shoppingCart.forEach((item : any , index : number) => 
    {
      if(item.drugCode == product.drugCode)
      {
        this.shoppingCart.splice(index, 1);
      };     
    });
    this.updateSubTotal();
  };

  processOrder()
  {
    let products : Array<any> = [];
    this.shoppingCart.forEach((item : any , index : number) => 
    {
      let productItem = {
        drugCode : item.drugCode,
        drugName : item.drugName,
        price : item.price,
        quantity : parseInt(item.quantity),
      }
      products.push(productItem);      
    });
    let orderItem = {
      userId: this.userId,
      products: products
    }   
    this.checkout.emit(orderItem);
  }
 

  ngOnInit(): void {
    this.updateSubTotal();
  }

}
