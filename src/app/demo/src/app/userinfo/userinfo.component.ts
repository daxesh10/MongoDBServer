import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  userId = '';
  baseUrl = 'http://localhost:3000/';
  errorMsg = '';
  data = 
  {
    firstName: '',
    lastName:  '',
    email:  '',
    password: {
        iv:   '',
        content:   '',
    },
    gender: '',
    phoneNumber:  '',
    cardNumber:  '',
 };


 constructor(private http: HttpClient , private activatedRoute: ActivatedRoute, private router: Router) {
  this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        this.userId = id;          
    });
};

getUser(userId : string)  
{           
    this.http.get<any>(this.baseUrl + 'api/user/'+ userId)
    .subscribe(       
      result  => {  
        console.log('getUser result', result);
                
        this.data = {
          firstName: result.First_Name,
          lastName:  result.Last_Name,
          email:  result.Email,
          password: {
                  iv:   result.Password.iv,
                  content:  result.Password.content,
          },
          gender: result.Gender,
          phoneNumber:  result.Phone_Number,
          cardNumber:  result.Credit_Card_Number,
        }
        console.log('getUser data', this.data);          
      },
      error => {
        console.log('getUser error', error.error.message);
        this.errorMsg = error.error.message;
      },
      ()=>{
        //redirect to new page
        this.errorMsg = ''          
      }
    );  
}

updateUser(formData : any){
  console.log('updateUser formData', formData.value); 
  this.http.put<any>(this.baseUrl + 'api/user/' + this.userId, { 
    firstName:formData.value.firstName ,
    lastName:formData.value.lastName ,
    email: formData.value.email , 
    password : formData.value.password,
    gender:formData.value.gender ,
    phoneNumber:formData.value.phoneNumber ,
    cardNumber:formData.value.cardNumber ,
    
  })
  .subscribe(       
    result  => {
      console.log('formData data', result);
      this.router.navigate(['/dashboard', result.updatedUser._id ])
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
};

  ngOnInit(): void {
    this.getUser(this.userId);
  }

}
