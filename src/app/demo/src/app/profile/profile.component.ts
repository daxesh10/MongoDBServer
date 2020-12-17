import { Component, OnInit , Output , EventEmitter} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserinfoComponent } from '../userinfo/userinfo.component';
import { ProductgridComponent } from "../productgrid/productgrid.component";
import { CartComponent } from "../cart/cart.component";
import { OrderlistComponent } from "../orderlist/orderlist.component";
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css' , '../../assets/vendor/bootstrap/css/bootstrap.min.css']
})
export class ProfileComponent implements OnInit {

  userId = '';
  baseUrl = 'http://localhost:3000/';
  errorMsg = '';
//   user = {
//     firstName: '',
//     lastName:  '',
//     email:  '',
//     password: {
//         iv:   '',
//         content:   '',
//     },
//     gender: '',
//     phoneNumber:  '',
//     cardNumber:  '',
//  };
 //products  : Array<any> = [];
 userOrders  : Array<any> = [];
 tabActive : String = 'Profile';
 shoppingCart : Array<any> = [];

  constructor(private http: HttpClient , private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(params => {
          let id = params['id'];
          this.userId = id;          
      });
  };

  // getUser(userId : string)  
  // {           
  //     this.http.get<any>(this.baseUrl + 'api/user/'+ userId)
  //     .subscribe(       
  //       result  => {          
  //         this.user = {
  //           firstName: result.First_Name,
  //           lastName:  result.Last_Name,
  //           email:  result.Email,
  //           password: {
  //                   iv:   result.Password.iv,
  //                   content:  result.Password.content,
  //           },
  //           gender: result.Gender,
  //           phoneNumber:  result.Phone_Number,
  //           cardNumber:  result.Credit_Card_Number,
  //         }
  //         console.log('getUser data', this.user);          
  //       },
  //       error => {
  //         console.log('getUser error', error.error.message);
  //         this.errorMsg = error.error.message;
  //       },
  //       ()=>{
  //         //redirect to new page
  //         this.errorMsg = ''          
  //       }
  //     );  
  // }
  
  
  // getProducts()  
  // {           
  //     this.http.get<any>(this.baseUrl + 'api/product')
  //     .subscribe(       
  //       result  => {              
  //         result.forEach((element: any , index: number) => {
  //           let item = {
  //             _id: element._id,
  //             drugName: element.Drug_Name,
  //             drugCompany:  element.Drug_Company,
  //             drugCode:  element.Drug_Code,
  //             price: element.Price,
  //             image: element.Image,
  //             stocks: element.Stocks,              
  //          }
  //          this.products.push(item);
  //         });  
  //         console.log('products', this.products);
               
  //       },
  //       error => {
  //         console.log('getProducts error', error.error.message);
  //         this.errorMsg = error.error.message;
  //       },
  //       ()=>{
  //         //redirect to new page
  //         this.errorMsg = ''          
  //       }
  //     );  
  // }


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


  navigation(tab : string){
    this.tabActive = tab;
  }

  addToCartHandeler(product : any){
    let validToAdd = true;
    this.shoppingCart.forEach(item => {
      if(item.drugCode == product.drugCode){
        validToAdd = false;
      };      
    });
    if(validToAdd){
      let data = {
              drugCode: product.drugCode,
              drugCompany: product.drugCompany,
              drugName: product.drugName,
              image: product.image,
              price: product.price,
              stocks: product.stocks,
              _id: product._id,
              quantity: 1,
              total: product.price,
        };
      this.shoppingCart.push(data);
    }            
  };

  proccedToCheckout(data :any)
  {
      //console.log('proccedToCheckout', data);
      this.http.post<any>(this.baseUrl + 'api/order', { 
        userId: data.userId,
        products: data.products,
      })
      .subscribe(       
        result  => {
          console.log('proccedToCheckout data', result);
          this.shoppingCart = [];
          this.router.navigate(['/dashboard', result.createdOrder.User_ID ]);
          
        },
        error => {
          console.log('formData error', error.error.message);
          this.errorMsg = error.error.message;
        },
        ()=>{
          //redirect to new page
          this.errorMsg = ''          
        }
      );      
  }

  ngOnInit(): void 
  {
    //this.getUser(this.userId);
    //this.getProducts();
    this.getOrdersByUserId(this.userId);
  }

}
