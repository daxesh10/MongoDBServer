import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email :string = '';
  password:string ='';
  baseUrl = 'http://localhost:3000/';
  errorMsg = '';
  constructor(private http: HttpClient , private route: ActivatedRoute, private router: Router) { };


  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigateByUrl('');
  }

  register(formData : any)
  {
      
      this.http.post<any>(this.baseUrl + 'api/user', { 
        firstName:formData.value.firstName ,
        lastName:formData.value.lastName ,
        email: formData.value.email , 
        password : formData.value.password,
        gender:formData.value.gender ,
        phoneNumber:formData.value.firstName ,
        cardNumber:formData.value.cardNumber ,
        
      })
      .subscribe(       
        result  => {
          console.log('formData data', result);
          this.router.navigate(['/dashboard', result.createdUser._id ])
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

}
