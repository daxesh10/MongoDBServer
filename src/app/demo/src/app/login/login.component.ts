import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email :string = '';
  password:string ='';
  baseUrl = 'http://localhost:3000/';
  errorMsg = '';
  constructor(private http: HttpClient , private route: ActivatedRoute, private router: Router) { };


  ngOnInit(): void {
  }

  register(){
    this.router.navigate(['/register'])
  }

  login(formData : any)
  {
      
      this.http.post<any>(this.baseUrl + 'login', { email: formData.value.email , password : formData.value.password})
      .subscribe(       
        result  => {
          console.log('formData data', result);
          this.router.navigate(['/dashboard', result.user._id ])
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
