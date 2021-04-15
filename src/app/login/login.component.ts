import { Component, OnInit } from '@angular/core';
import { Api } from '../api';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
pass;
email;
url =  new Api()
  constructor(private userService : UserService,private router : Router, private toaster:ToastrService) { }

  ngOnInit(): void {
    let isLogged = this.userService.islogged();
    if(isLogged)
    {
         this.router.navigate(['/'])
    }
  }



      login()
      {
    
      this.userService.login(this.email,this.pass).subscribe(res => {


        
          let token = res.token
          let user = res.user
          let privileges = res.privileges

              localStorage.setItem('token',token);
              localStorage.setItem('user',JSON.stringify(user));
              localStorage.setItem('privileges',JSON.stringify(privileges));
              this.router.navigate(['/'])
              this.toaster.success('welcome!')
        
              
      },err=>{

         if(err.status == 403)
         {
          this.toaster.error('Invalid Credentials')

         }else{
          this.toaster.error('serveur issues')

         }

      })
      }



}
