import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { ClientService } from 'src/app/services/client.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Items } from 'src/app/items'
import { Bill } from 'src/app/bill'

declare const $: any;
@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit {
  company
  companyForm: FormGroup;
  clientForm: FormGroup;
  itemForm: FormGroup;
  clientId
  client
  item
  items = new Array()
  itemz
  selectedItem = new Array()
  addItemModal: boolean
  Items =[];
  itemsArray: Array<Items> = [];
  newItem: any = {};
  clientInfo
  billArray: Array<Bill> = [];
  newBill: any = {};
  value
  total=0

  constructor(private billService: BillService,
              private clientService : ClientService,
              private fb:FormBuilder) {

                let ItemsFormControle = {

                  designation : new FormControl('',[
                      Validators.required,
                      Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                      Validators.minLength(4),
                      ]),

                  quantity : new FormControl ('',[
                        Validators.pattern("[0-9 .'-]+"),
                        ]),
                  u_price : new FormControl ('',[
                      Validators.pattern("[0-9 .'-]+"),
                      ]),
                  total_price : new FormControl ('',[
                      Validators.pattern("[0-9 .'-]+"),
                      ]),
                 }


      let formControls = {

                  client_name : new FormControl('',[
                      Validators.required,
                      Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                      Validators.minLength(4),
                      Validators.maxLength(20)
                      ]),
                  email : new FormControl ('',[
                      Validators.required,
                      Validators.email
                      ]),
                  matFisc : new FormControl ('',[
                      Validators.required,
                      Validators.minLength(7),
                      ]),
                  address : new FormControl ('',[
                      Validators.required,
                      Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                      Validators.minLength(4),
                      ]),

                    }

                this.clientForm = this.fb.group(formControls) ;
                this.itemForm = this.fb.group(ItemsFormControle) ;
                    }
                  //client Form
                    get client_name() { return this.clientForm.get('client_name') }
                    get email() { return this.clientForm.get('email') }
                    get matFisc() { return this.clientForm.get('matFisc')}
                    get address() { return this.clientForm.get('address')}
                  //Item Form
                  get designation() { return this.itemForm.get('designation') }
                  get quantity() { return this.itemForm.get('quantity') }
                  get u_price() { return this.itemForm.get('u_price')}
                  get total_price() { return this.itemForm.get('total_price')}

  ngOnInit(): void {
    this.billService.getCompanyInfo().subscribe(
      res=>{
        this.company=res
        },err=>{
       console.log(err);
      }
     )

     this.clientService.getClients().subscribe(
      res=>{
          this.client=res

          this.clientId= this.client.id

          this.clientForm.patchValue({
            client_name: this.client.client_name,
            email:this.client.email,
            matFisc : this.client.matFisc,
            address : this.client.address})

        },err=>{
       console.log(err);
      }
    )



  }

  addRow(index) {
    this.newItem = {designation: "", quantity: "",u_price:"",total_price:""};
    this.itemsArray.push(this.newItem);
    // console.log(this.itemsArray);
    return true;

}

deleteRow(index) {
  if(this.itemsArray.length ==1) {
      return false;

  } else {
      this.itemsArray.splice(index, 1);
      // console.log(this.itemsArray)

      return true;
  }

}

getClientInfo(event){
  if(event)
{
  this.clientService.getClientInfo(this.clientId).subscribe(

    res=>{
      this.clientInfo = res

      console.log( this.clientInfo);


    },err=>{
      console.log(err)
    }

  )
}
this.ngOnInit()
}

  showBill(){

    this.billArray.push(this.newBill);
    console.log(this.billArray);

  }

caclucTotalOfOneItem(ele,i){
  if(
    typeof ele.quantity !== 'undefined' &&
    typeof ele.u_price !== 'undefined'
  ){
    ele.total_price = ele.quantity* ele.u_price
    this.sumofTotalPrice()
    this.calculTVAprice()
    this.calculTTCprice()
 
  }
}
  sumofTotalPrice(){
    this.total= this.itemsArray.reduce((acc, val) => acc += val.total_price, 0)
    this.newBill.ht_price = this.total
    // console.log(this.newBill.ht_price)
  }
  calculTVAprice(){
    this.newBill.price_tva = (this.newBill.ht_price * this.newBill.rate_tva) / 100
    // console.log(this.newBill.price_tva)
  }
  calculTTCprice(){
    this.newBill.total_ttc =  this.newBill.ht_price * ((this.newBill.rate_tva/100)+1)
  }
  saveBill() {

    // this.billService.saveBill(this.billArray).subscribe(
    //   res=>{
    //     console.log(res)
    //   },err=>{
    //     console.log(err)
    //   }
    // )
    console.log(this.billArray);
    console.log(this.itemsArray);

    }

}
