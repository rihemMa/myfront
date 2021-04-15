import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api } from '../api';
@Injectable({
  providedIn: 'root'
})
export class ClientService {


  api = new Api();
myToken = localStorage.getItem('token')
 header = {headers: new HttpHeaders().append('Authorization','Bearer '+this.myToken )}
  constructor(private http:HttpClient) { }

  clientWithContacts()
  {
    return this.http.get<any>(this.api.api+'/clientWithContacts',this.header)
  }

  addClient(client)
  {
    return this.http.post<any>(this.api.api+'/createClient' , {client : client},this.header) ;
  }

  updateClient(id,client)
  {
    return this.http.put<any>(this.api.api+'/updateClient/'+id , {client : client},this.header) ;
  }

  deleteClient(clients_id)
  {
    return this.http.post<any>(this.api.api+'/deleteClient' , {clients_id : clients_id},this.header) ;
  }


  getClients()
  {
    return this.http.get<any>(this.api.api+'/getClients',this.header)
  }


  getClientInfo(id){

      return this.http.get<any>(this.api.api+'/getClients/'+id,this.header)
  }
}
