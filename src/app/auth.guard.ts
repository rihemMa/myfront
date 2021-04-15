import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService:UserService,private router :Router,private toastr:ToastrService,){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      
      let islogged = this.userService.islogged()
      if(islogged)
      {
        return true
      }else{
        this.router.navigate(['/login'])
        this.toastr.warning("connect first!")
        
       
      
          return false
      }
  }
  
}
