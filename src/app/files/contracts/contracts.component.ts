import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import jsPDF from 'jspdf' ;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent {


  addnewPaperType: boolean;





  selectedUser
  selecteduser
  filteredusers
displayModal: boolean;
displayModal1: boolean;
displayModal3: boolean;
exportColumns:[];
doc = new jsPDF()

  constructor(private  userService:UserService) { }

  ngOnInit(): void {
  }



  showModalDialog() {
    this.displayModal = true;
}

// showModalDialog2() {
//   this.displayModal2 = true;
// }

showModalDialog3() {
  this.displayModal3 = true;
}




exportPdf() {
  //  this.doc.default(0,0) ;
  //  this.doc.autoTable(this.exportColumns,this.selectedBills)

  this.doc.save('table.pdf')
}





deleteUser()
{
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this imaginary file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      alert('deleted')
      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'

      )
    // For more information about handling dismissals please visit
    // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })


}


showModal()
{
  this.addnewPaperType =  true
}

}
