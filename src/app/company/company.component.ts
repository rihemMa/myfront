import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BillService } from 'src/app/services/bill.service';
import { PaperTypeService } from '../services/paper-type.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companyForm: FormGroup;
  company
  companyId
  files
  path
  generalLink = "http://localhost:8000/"
  users
  selectedUsers =[]

  constructor( private fb:FormBuilder,
    private billService : BillService,
    private toastr: ToastrService,
    private paperTypeService : PaperTypeService,
    private userService : UserService) {
      let formControls = {

        name : new FormControl('',[
            Validators.required,
            Validators.pattern("[A-Z a-z 0-9 .'-]+"),
            Validators.minLength(4),
            Validators.maxLength(20)
            ]),
        email : new FormControl ('',[
            Validators.required,
            Validators.email
            ]),
        mat_fiscal : new FormControl ('',[
            Validators.required,
            ]),
        local : new FormControl ('',[
            Validators.required,
            Validators.pattern("[A-Z a-z 0-9 .'-]+"),
            Validators.minLength(4),
            ]),
        phone_number : new FormControl ('',[
            Validators.required,
            Validators.pattern("[0-9 .'-]+"),
            Validators.minLength(8),
            ]),
        tva : new FormControl ('',[
              Validators.required,
              Validators.pattern("[0-9 .'-]+"),
              Validators.minLength(8),
              ]),
         tax : new FormControl ('',[
                Validators.required,
                Validators.pattern("[0-9 .'-]+"),
                Validators.minLength(8),
                ]),
        bank : new FormControl ('',[
                Validators.required,
                Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                ]),
        logo : new FormControl ('',[
                  Validators.required,
                  ]),
        domaine : new FormControl ('',[
            Validators.required,
            Validators.pattern("[A-Z a-z 0-9 .'-]+"),
            ])}
     this.companyForm = this.fb.group(formControls) ;
     }
  get name() { return this.companyForm.get('name') }
  get email() { return this.companyForm.get('email') }
  get mat_fiscal() { return this.companyForm.get('mat_fiscal')}
  get local() { return this.companyForm.get('local')}
  get logo() { return this.companyForm.get('logo')}
  get bank() { return this.companyForm.get('bank')}
  get tva() { return this.companyForm.get('tva')}
  get tax() { return this.companyForm.get('tax')}
  get phone_number() { return this.companyForm.get('phone_number')}
  get domaine() { return this.companyForm.get('domaine')}


  ngOnInit(): void {

    this.userService.getusers().subscribe(
      res=>{
        this.users=res
      },err=>{
        console.log(err);
      }
    )

    this.billService.getCompanyInfo().subscribe(
      res=>{

        this.company=res[0]
        // console.log(this.company);
        this.path = this.company.logo

        this.companyId= this.company.id

        this.companyForm.patchValue({
          name: this.company.name,
          local:this.company.local,
          bank : this.company.bank,
          email : this.company.email,
          mat_fiscal : this.company.mat_fiscal,
          domaine : this.company.domaine,
          logo : this.company.logo,
          tva : this.company.tva,
          tax : this.company.tax,
          phone_number:this.company.phone_number
         })
        },err=>{
       console.log(err);
      }
     )
  }

 async updateCompany(){

    let formData = new FormData();
    let path = ''
    if(this.files){
      (formData.append("file",this.files,this.files.name))
      await this.paperTypeService.uploadFile(formData).then(
      res => {
        path = res.path
        console.log(path)
        }, err => { console.log(err);})

      }
    let data = this.companyForm.value
    this.billService.updateCompany(this.companyId ,data,path).subscribe(
      res => {
        this.toastr.success("Company Info Are Updated ")
        this.ngOnInit()
          }, err => { console.log(err) }
          )
  }

  clearCompanyInfo(){
    this.companyForm.reset()
  }

  selectFile(event) {
    this.files = event.target.files[0]
  }



}
