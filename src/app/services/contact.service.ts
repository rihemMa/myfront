import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api } from '../api';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  
  api = new Api();
myToken = localStorage.getItem('token')
 header = {headers: new HttpHeaders().append('Authorization','Bearer '+this.myToken )}
  constructor(private http:HttpClient) { }



  createContact(client_id,contact)
  {

    return this.http.post<any>(this.api.api+'/createContact',{contact:contact,client_id:client_id},this.header)
  }

  updateContact(contact_id,contact)
  {
    return this.http.put<any>(this.api.api+'/updateContact',{ newContact:contact,contact_id:contact_id },this.header)
  }


  deleteContact(id)
  {
    return this.http.post<any>(this.api.api+'/deleteContact',{contact_id :id},this.header)
  }


}
