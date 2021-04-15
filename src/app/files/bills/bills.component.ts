import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2'

declare const $: any;

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  number
  bills
  selectedBill
  years = Array()
  year
  thisyear
  num = 0
  constructor(private billService: BillService,private toastr:ToastrService ,
    private router : Router) { }

  ngOnInit(): void {
    for ( let i = 2010 ;  i < 2050 ; i++  )
    {
      this.years.push({
       year : i
      })


    }

    this.thisyear = new Date().getFullYear()
    // console.log(this.thisyear);

    // console.log(this.years);
    this.billService.getBills().subscribe(
    res=>{

      this.bills = res
      this.num = this.bills.length

      console.log(this.bills);

    },err=>{
      console.log(err)
    }
  )

  }


  deleteBill(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do You Really Want To Delete The Bill!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        let bills_id = []
        this.selectedBill.map(el=>{
          bills_id.push({
          "bill_id": el.id
        })
        })
        console.log(bills_id)
        this.billService.deleteBill(bills_id).subscribe(
          res=>{
            // console.log(res)
            this.toastr.success('Bill is deleted')
            this.ngOnInit()
          }, err=>{
            console.log(err)
          }
          )
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
          )

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your file is safe :)',
            'error'
          )
        }})}


 addBill()
{




    if( (this.num > 0) && ( this.num < 9))
    {
      this.number = '0000'+this.num
    }
    else if ((this.num > 10) && ( this.num < 99 )){
      this.number = '000'+this.num
    }else if ((this.num > 100) && (this.num < 999)){
      this.number = '00'+this.num
    }else if ( (this.num > 1000) && ( this.num  < 9999)){
        this.number = '0'+this.num
    }else if((this.num > 10000) && (this.num < 99999))
    {
      this.number = this.num
    }
return this.number

}





async nav()
{
  let num = 0
  console.log(num);

 num =  await this.addBill()
console.log(num);
this.router.navigate(['/addBill',num])

}
}
