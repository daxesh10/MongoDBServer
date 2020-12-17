import { Component, OnInit , Output , EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productgrid',
  templateUrl: './productgrid.component.html',
  styleUrls: ['./productgrid.component.css' ,'../../assets/vendor/bootstrap/css/bootstrap.min.css']
})
export class ProductgridComponent implements OnInit {

  userId = '';
  baseUrl = 'http://localhost:3000/';
  errorMsg = '';
  products  : Array<any> = [];


  constructor(private http: HttpClient , private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(params => {
          let id = params['id'];
          this.userId = id;          
      });
  };

  @Output() 
  addToCart = new EventEmitter<any>();

  getProducts()  
  {           
      this.http.get<any>(this.baseUrl + 'api/product')
      .subscribe(       
        result  => {              
          result.forEach((element: any , index: number) => {
            let item = {
              _id: element._id,
              drugName: element.Drug_Name,
              drugCompany:  element.Drug_Company,
              drugCode:  element.Drug_Code,
              price: element.Price,
              image: element.Image,
              stocks: element.Stocks,              
           }
           this.products.push(item);
          });  
          console.log('products', this.products);
               
        },
        error => {
          console.log('getProducts error', error.error.message);
          this.errorMsg = error.error.message;
        },
        ()=>{
          //redirect to new page
          this.errorMsg = ''          
        }
      );  
  }

  addToShoppingCart(product : any){ 
    this.addToCart.emit(product);    
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
