import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api } from '../api';
@Injectable({
  providedIn: 'root'
})
export class PaperTypeService {

  api = new Api();
  myToken = localStorage.getItem('token')
  header = {headers: new HttpHeaders().append('Authorization','Bearer '+this.myToken )}
  constructor(private http : HttpClient) { }




  getPaperTypes()
  {
           return this.http.get<any>(this.api.api+'/getPaperTypes',this.header)
  }


  getPapers()
  {
    return this.http.get<any>(this.api.api+'/getPapers',this.header)
  }


  createPaper(paper,file_path)
  {
    return this.http.post<any>(this.api.api+'/createPaper',{paper : paper, file_path: file_path},this.header)
  }



  updatePaper(paper_id,newPaper)
  {
         return   this.http.put<any>(this.api.api+'/updatePaper',{ newPaper: newPaper,paper_id :paper_id},this.header)
  }
  deletePaper(papers_id){
    return this.http.post<any>(this.api.api+'/deletePaper',{papers_id : papers_id },this.header)
  }

  uploadFile(data)
  {
    return this.http.post<any>(this.api.api+'/uploadFile',data,this.header).toPromise()
  }

}
