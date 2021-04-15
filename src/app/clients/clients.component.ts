import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../services/client.service';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients
  slectedClientId
  slected_Client_Id   // for contact
  selectedClients
  clientForm: FormGroup;
  contactForm : FormGroup;
  displayModal: boolean;
  displayModal1: boolean;
  addNewClientModal: boolean;
  addContactModal: boolean;
  btnable

            constructor(private clientService: ClientService,
                        private fb:FormBuilder,
                        private toastr: ToastrService,
                        private contactService :ContactService) {
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
                      phone : new FormControl ('',[
                          Validators.required,
                          Validators.pattern("[0-9 .'-]+"),
                          Validators.minLength(8),
                          ]),
                      fax : new FormControl ('',[
                          Validators.required,
                          Validators.pattern("[0-9 .'-]+"),
                          Validators.minLength(8),
                          ])}


    let contactFormControle = {

                      contact_name : new FormControl('',[
                          Validators.required,
                          Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                          Validators.minLength(4),
                          Validators.maxLength(20)
                          ]),

                          contact_email : new FormControl ('',[
                          Validators.email
                          ]),
                      position : new FormControl ('',[
                          Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                          Validators.minLength(4),
                          Validators.maxLength(50)
                          ]),
                      contact_phone : new FormControl ('',[
                          Validators.pattern("[0-9 .'-]+"),
                          Validators.minLength(8),
                          ]),
                      description : new FormControl ('',[
                          Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                          ])}

                this.clientForm = this.fb.group(formControls) ;
                this.contactForm = this.fb.group(contactFormControle) ;
   }


          // client form
              get client_name() { return this.clientForm.get('client_name') }
              get email() { return this.clientForm.get('email') }
              get matFisc() { return this.clientForm.get('matFisc')}
              get address() { return this.clientForm.get('address')}
              get fax() { return this.clientForm.get('fax')}
              get phone() { return this.clientForm.get('phone')}


              // contact form

              get contact_name() { return this.contactForm.get('contact_name') }
              get contact_email() { return this.contactForm.get('contact_email') }
              get contact_phone() { return this.contactForm.get('contact_phone')}
              get position() { return this.contactForm.get('position')}
              get description() { return this.contactForm.get('description')}



      ngOnInit(): void {

                this.clientService.clientWithContacts().subscribe(
                  res=>{
                    this.clients = res
                  },err=>{
                    console.log(err)
                  }
                )


  }

        addClient(){
                    let data = this.clientForm.value
                    this.clientService.addClient(data).subscribe(
                      res=>{
                      this.toastr.success('client added successfully')
                  this.addNewClientModal = false

                  this.ngOnInit()

                  },err=>{
                    console.log(err)
                     })
                     this.clientForm.reset()
                    }

        getSelectedClient(client){
                      this.displayModal = true
                      this.slectedClientId= client.id

                      this.clientForm.patchValue({
                        client_name: client.client_name,
                        email:client.email,
                        matFisc : client.matFisc,
                        address : client.address,
                        fax : client.fax,
                        phone : client.phone
                  })}

        updateUser(){
              let data = this.clientForm.value
              this.clientService.updateClient(this.slectedClientId,data).subscribe(
                res => {
                  this.toastr.success("updated !")
                  this.ngOnInit()
                    }, err => { console.log(err) })
              this.displayModal = false;}

        deleteClients(){
                Swal.fire({
                  title: 'Are you sure?',
                  text: 'You Have Project for that client Do you want to delete it!',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, keep it'
                }).then((result) => {
                  if (result.value) {

                    let clients_id = []
                    this.selectedClients.map(el=>{
                    clients_id.push({
                      "client_id": el.id
                    })
                    })
                    console.log(clients_id)
                    this.clientService.deleteClient(clients_id).subscribe(
                      res=>{
                        console.log(res)
                        this.toastr.success("deleted")
                        this.ngOnInit()
                      }, err=>{
                        console.log(err)
                      }
                      )
                      Swal.fire(
                        'Deleted!',
                        'Your imaginary file has been deleted.',
                        'success',
                      )

                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                      )
                    }})}

                showModalDialog3() {
                this.addNewClientModal = true;
                this.clientForm.reset()}

                addContactsModal(client_id) {
                  this.addContactModal = true;
                  this.slected_Client_Id = client_id
                }

          addContact(){
                  let contact = this.contactForm.value
                  this.contactService.createContact(this.slected_Client_Id,contact).subscribe(
                    res=>{
                    this.addContactModal = false;
                    this.toastr.success("contact added!")
                    this.contactForm.reset()
                      this.ngOnInit()
                    }, err=>{
                      console.log(err)
                    }
                  )
          }





          active(contact)
          {
            if(!contact.contact_name || !contact.contact_email)
            {
              return false
            }else{ return true}
          }

          updateContact(contact){

                  let newContact ={
                    "contact_name": contact.contact_name,
                    "position":contact.position,
                    "contact_email":contact.contact_email,
                    "contact_phone":contact.contact_phone,
                    "description":contact.description}

                  this.contactService.updateContact(contact.id,newContact).subscribe(
                    res=>{
                      console.log(res)
                      this.toastr.success('Updated!')
                      this.ngOnInit()
                      this.contactForm.reset()

                    },err=>{
                      console.log(err)
                    })
                  }


                deleteContact(id)
                {
                          this.contactService.deleteContact(id).subscribe(
                            res=>{
                              console.log(res)
                              this.toastr.success("deleted")
                              this.ngOnInit()
                            }, err=>{
                              console.log(err)
                            }
                          )
                }



}
