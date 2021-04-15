import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api } from '../api';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
  api = new Api();
  myToken = localStorage.getItem('token')
  header = {headers: new HttpHeaders().append('Authorization','Bearer '+this.myToken )}
  constructor(private http : HttpClient) { }



  getAllActions()
  {
    return this.http.get<any>(this.api.api+'/getActions',this.header)
  }



  getAllSpaces()
  {
    return this.http.get<any>(this.api.api+'/getSpaces',this.header)
  }

  createRole(role_name,table)
  {
    return this.http.post<any>(this.api.api+'/createRole',{role_name:role_name,table:table},this.header)
  }



  getAllRoles()
  {
    return this.http.get<any>(this.api.api+'/getRoles',this.header)
  }


  getRoleprivileges(id)
  {
    return this.http.get<any>(this.api.api+'/getRoleprivileges/'+id,this.header)
  }


  updateRole(id,role_name,table)
  {
    return this.http.put<any>(this.api.api+'/updateRole/'+id,{role_name:role_name,table:table},this.header)

  }
  deleteRole(table)
  {
    return this.http.post<any>(this.api.api+'/deleteRole',{roles_id:table},this.header)

  }
}
