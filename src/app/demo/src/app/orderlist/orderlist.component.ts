import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { totalmem } from 'os';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css','../../assets/vendor/bootstrap/css/bootstrap.min.css']
})
export class OrderlistComponent implements OnInit {

  userId = '';
  baseUrl = 'http://localhost:3000/';
  errorMsg = '';
  userOrders  : Array<any> = [];
  subtotal : number = 0;

  constructor(private http: HttpClient , private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(params => {
          let id = params['id'];
          this.userId = id;          
      });
  };

  updateSubTotal()
  {
    this.subtotal = 0;
    this.userOrders.forEach((order : any , index : number) => 
    {
      order.products.forEach((product : any) => {
        let total = product.Price * product.Quantity;
        this.subtotal += total;
      });
    });
  };

  getOrdersByUserId(userId : string)  
  {           
      this.http.get<any>(this.baseUrl + 'api/order/user/' + userId)
      .subscribe(       
        result  => {              
          result.forEach((element: any , index: number) => {
            let item = {
              _id: element._id,
              userId: element.User_ID,
              products: element.Products                            
           }
           this.userOrders.push(item);
          });  
          this.updateSubTotal();
          console.log('get userOrders', this.userOrders);
               
        },
        error => {
          console.log('get userOrders error', error.error.message);
          this.errorMsg = error.error.message;
        },
        ()=>{
          //redirect to new page
          this.errorMsg = ''          
        }
      );  
  }

 

  ngOnInit(): void {
    this.getOrdersByUserId(this.userId);
  }

}
