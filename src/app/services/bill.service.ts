import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api } from '../api';
@Injectable({
  providedIn: 'root'
})
export class BillService {

  api = new Api();
  myToken = localStorage.getItem('token')
  header = {headers: new HttpHeaders().append('Authorization','Bearer '+this.myToken )}
  constructor(private http:HttpClient) { }


  getCompanyInfo()
  {
    return this.http.get<any>(this.api.api+'/getCompanyInfo',this.header)
  }

  updateCompany(id,company,path)
  {
    return this.http.put<any>(this.api.api+'/updateCompany/'+id , {company : company, path:path},this.header) ;
  }

  getItems()
  {
    return this.http.get<any>(this.api.api+'/getItems',this.header)
  }

  GetItems(id)
  {
    return this.http.get<any>(this.api.api+'/getItems'+id,this.header)
  }

  saveBill(bill,items,config)
  {
    return this.http.post<any>(this.api.api+'/createBill' , {bill : bill,items : items, config : config},this.header) ;
  }
  saveItems(Item)
  {
    return this.http.post<any>(this.api.api+'/createItem' , {Item : Item},this.header) ;
  }

  getBills()
  {
    return this.http.get<any>(this.api.api+'/getBill',this.header)
  }

  deleteBill(bills_id)
  {
    return this.http.post<any>(this.api.api+'/deleteBill' , {bills_id : bills_id},this.header) ;
  }

  selectedYear(selectedYear)
  {
    return this.http.get<any>(this.api.api+'/selectedYear/'+selectedYear ,this.header) ;
  }
}
