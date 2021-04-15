import { Component, OnInit } from '@angular/core';
import pdfMake  from "pdfmake/build/pdfmake";
import pdfFonts  from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ClientService } from 'src/app/services/client.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BillService } from 'src/app/services/bill.service';
import { ToastrService } from 'ngx-toastr';
import { style } from '@angular/animations';
import { Column } from 'jspdf-autotable';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { NgxNumToWordsService, SUPPORTED_LANGUAGE } from 'ngx-num-to-words';

class Product{
  designation: string;
  u_price: number;
  quantity: number;
  total_price: number;
}
class Tva{
  ht_price: number;
  rate_tva: number;
  fiscal_timber: number;
  price_tva: number;
  total_ttc: number;
  clientid : number ;
  date: Date;
  billNum: number;
  description: String;
}

class Invoice{
  customerName: string;
  address: string;
  contactNo: number;
  email: string;
  clientid : number ;
  matFisc: string;


  products: Product[] = [];
  tvaTab : Array<Tva> = [];
  tvaObj: any = {};

  constructor(){
    // Initially one empty product row we will show
    this.products.push(new Product());
    this.tvaTab.push(this.tvaObj);
  }
}
@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {
  selectedClient
  clientId
  clients
  clientForm: FormGroup;
  total=0
  totalPrice
  generalLink = "http://localhost:8000/"
  company =  {}
  num
  tax
  rate_tva
  logoDataUrl: string;
  numberInWords!: string;
  lang!: SUPPORTED_LANGUAGE = 'fr';


  constructor(private ngxNumToWordsService: NgxNumToWordsService, private fb:FormBuilder,private billService: BillService,
               private clientService : ClientService,
               private toaster:ToastrService,
               private activeRoute : ActivatedRoute,
               private companyService : CompanyService) {

                let formControls = {

                  client_id : new FormControl('',[
                      Validators.required,
                      ]),
                    }
                    this.clientForm = this.fb.group(formControls) ;

                }
       get client_id() { return this.clientForm.get('client_id') }


  ngOnInit() : void{


     this.clientService.getClients().subscribe(
      res=>{
          this.clients=res
        // console.log(res);
        },err=>{
       console.log(err);
      }
    )
       this.companyService.getCompanyInfo().subscribe(
      res => {
        this.company = res
        this.tax = this.company[0].tax
        this.rate_tva = this.company[0].tva
      }, err => {
  console.log(err);

      }
    )
   this.num = this.activeRoute.snapshot.params.numBill
   console.log(this.num);

      this.testt()

  }
  caclucTotalOfOneItem(ele,i){
    if(
      typeof ele.quantity !== 'undefined' &&
      typeof ele.u_price !== 'undefined'
    ){
      ele.total_price = ele.quantity * ele.u_price
      // console.log(ele.total_price);
      this.sumofTotalPrice()
      this.calculTVAprice()
      this.calculTTCprice()
      this.testt()
      // console.log(this.invoice);
      // console.log(this.invoice.tvaTab);
      // console.log(this.invoice.tvaObj);
    }}
  sumofTotalPrice(){

    this.total= this.invoice.products.reduce((acc, val) => acc += val.total_price, 0)
    this.invoice.tvaObj.ht_price = this.total
    // console.log(this.invoice.tvaObj.ht_price);
    // console.log(this.total)
  }
  calculTVAprice(){
    this.invoice.tvaObj.price_tva = (this.invoice.tvaObj.ht_price * this.rate_tva) / 100
  }
  calculTTCprice(){
    this.invoice.tvaObj.total_ttc =  this.invoice.tvaObj.ht_price * ((this.rate_tva/100)+1)
  }

  saveBill() {
    console.log(this.invoice);

  let config = {
    "numBill" : this.num,
    "tax" : this.tax,
    "tva" : this.rate_tva
  }

      this.billService.saveBill(this.invoice.tvaObj,this.invoice.products,config).subscribe(
        res=>{
          // console.log(res)
          this.toaster.success('Bill Created!')


        },err=>{
          console.log(err)
        }
      )

    }

    testt(){
      let value = this.invoice.tvaTab[0].total_ttc;
     this.numberInWords = this.ngxNumToWordsService.inWords(value, this.lang);
        // console.log(this.numberInWords);
    }


  invoice = new Invoice();

  generatePDF(action = 'open') {


    let docDefinition = {

      content: [
        {
          columns: [
            [
              {
                image: 'data:image/png;base64,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'
                ,width: 150,
                height: 150
              },
            ],
            [

            ],
            [
              {
                text: 'Nachd-IT',
                fontSize: 16,
                alignment: 'right',
                color: '#1e3799'
              },
              {
                text: 'Facture',
                fontSize: 40,
                bold: true,
                alignment: 'right',
                color: '#0c2461'
              },
              {
                text: '            '
              }
              ,
              {
                text: ` N° Facture : `+' '+ this.num,
                alignment: 'right',
                fontSize: 10,
              },

              {
                text: `Date de Facturation :  `+' '+ this.invoice.tvaTab[0].date,
                alignment: 'right',
                fontSize: 10,
              },
            ]
          ]
        }
        ,
        {
          columns: [
            [
              {
                text: this.company[0].name, style:'fontt',
                bold:true
              },

              { text: this.company[0].email , style:'fontt'},
              { text: this.company[0].phone_number , style:'fontt'},
              { text: this.company[0].local , style:'fontt'},
            ],

            [


            ],
            [


            ],
            [


            ],
            [
              {
                text: this.selectedClient.client_name,
                bold:true, style:'fontt'
              },
              { text: this.selectedClient.address, style:'fontt' },
              { text: this.selectedClient.email, style:'fontt' },
              { text: this.selectedClient.phone , style:'fontt'},
              { text: this.selectedClient.matFisc , style:'fontt'},
            ]
          ]
        },
        {
          text: '                                                                      '
        },
        {
          columns: [
              {
                table: {
                  headerRows: 1,
                  widths: ['*', 'auto', 'auto', 'auto'],
                  body: [
                    [{text:'Désignation' ,style:'RowFont'}, {text:'Quantité' ,style:'RowFont'},{text:'Prix',style:'RowFont'}, {text:'Somme',style:'RowFont'}, ],
                    ...this.invoice.products.map(p => ([p.designation, p.quantity, p.u_price, (p.u_price*p.quantity).toFixed(3)])),
                  ]
                },
                layout:  {
                hLineWidth: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? 0 : 1;
                },
                vLineWidth: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? 0 : 1;
                },
                hLineColor: function (i, node) {
                  return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
                },
                vLineColor: function (i, node) {
                  return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
                },
                },




              }
          ]
        },
        {
          text: '                                                                      '
        },
        {
          columns: [

              {

              },
              [

                  {
                      columns: [
                          {
                              text:'',
                              width: '*'
                          },
                          {
                            table: {
                              headerRows: 1,
                              body: [
                                [{text:'Montant HT',style:'RowFont' }, this.invoice.tvaTab[0].ht_price.toFixed(3) ],
                                [{text:'Taux TVA' ,style:'RowFont' }, this.rate_tva ],
                                [{text:'Montant TVA' ,style:'RowFont'  }, this.invoice.tvaTab[0].price_tva.toFixed(3) ],
                                [{text:'Timbre Fiscal' ,style:'RowFont'  }, this.tax ],
                                [{text:'Montant TTC', style: 'font' }, this.invoice.tvaTab[0].total_ttc.toFixed(3)  ],
                                [{text:'Montant en toute lettres', style: 'RowFont' }, this.numberInWords  ],
                              ]
                            },
                            layout:  {

                            hLineWidth: function (i, node) {
                              return (i === 0 || i === node.table.body.length) ? 0 : 1;
                            },
                            vLineWidth: function (i, node) {
                              return (i === 0 || i === node.table.widths.length) ? 0 : 1;
                            },
                            hLineColor: function (i, node) {
                              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
                            },
                            vLineColor: function (i, node) {
                              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
                            },
                            },

                              alignment: 'right', // Optional, for body texts
                              width: 'auto', // Changes width of the table


                          }
                      ]
                  }
              ]
          ]
        },
      {
          ul: [
            this.invoice.tvaTab[0].description
          ],
      },

      ],
      footer:
      [ {text: this.company[0].domaine  , style: 'sectionFooter'
        },
        {text: this.company[0].email + ' ' + '-' + ' ' + ' Bank : ' + this.company[0].bank + ' ' + '-' + ' ' + ' TVA :' + this.company[0].mat_fiscal , style: 'sectionFooter'
        },
      ],
      styles: {
        font:{
          fontSize : 15,
          fillColor: '#1e3799',
          color: 'white'
        },
        fontt:{
          fontSize : 9,
          color: 'grey'
        },
        RowFont:{
          fillColor: '#1e3799',
          color: 'white',
          alignment: 'left'
        },
        sectionHeader: {
          bold: true,
          color: '#1e3799',
          fontSize: 10,
          margin: [0, 15,0, 15]
        },
         sectionFooter: {
          fontSize: 9,
          margin: [10, 0,0, 0],
          color: 'grey'
        }
      }
    };

    if(action==='download'){
      pdfMake.createPdf(docDefinition ,).download();
    }else if(action === 'print'){
      pdfMake.createPdf(docDefinition).print();
    }else{
      pdfMake.createPdf(docDefinition).open();
    }
  }
  addProduct(){
    this.invoice.products.push(new Product());
  }
  test(event){
    if(event)
    {
     this.clientService.getClientInfo(this.invoice.clientid).subscribe(

      res=>{
        this.selectedClient = res
        // console.log( this.invoice.clientid);
      },err=>{
        console.log(err)
      }

    )

    }

  }




}
