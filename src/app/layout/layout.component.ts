import { Component, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  
  constructor(private router:Router) { }

  ngOnInit(): void {
    let url=this.router.url
    
        
        let privileges = JSON.parse(localStorage.getItem('privileges'))
    


        let  reslt  = privileges.find(element =>{
         let name = element.space.space_name
         let i = url.indexOf(name)
         if(i != -1)
         {
           return element.space
         }
         
        });


        if(!reslt)
        {
          this.router.navigate(['/dashboard'])
        }


    

   }
}
