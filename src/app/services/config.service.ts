import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {


  status_project = [
    {
      "id":1,
      "status_name":"Open",
      "color":"#20bf6b",
      "icon" : "pi-check"
     },
     {
      "id":2,
      "status_name":"Closed",
      "color":"#fab1a0",
      "icon":"pi-times"
       }

  ]


  status_paper= [
    {
      "id":1,
      "status_name":"New",
      "color":"#20bf6b",
      "icon" : "pi-check"
     },
     {
      "id":2,
      "status_name":"Canceled",
      "color":"#fab1a0",
      "icon":"pi-times"
       },
       {
        "id":3,
        "status_name":"Expired",
        "color":"#f7d794",
        "icon":"pi-exclamation-triangle"
         }
         ,
       {
        "id":4,
        "status_name":"No Status",
        "color":"#778ca3",
        "icon":"pi-exclamation-triangle"
         }

  ]

  constructor() { }
}
