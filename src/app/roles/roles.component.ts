import { Component, OnInit } from '@angular/core';
import { PrivilegeService } from '../services/privilege.service';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

declare const $: any;
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  displayModal:  boolean;
  displayModal2: boolean;
  displayModal3: boolean;

  selectedRoles
  roles
  actions
  spaces
  selectedPriv = new Array()
  role_name
  role_privileges
  tab
  idOfselectedRole
  nameValidator



  action = new Array()
  constructor(
              private privilegeService : PrivilegeService ,
              private toastr:ToastrService
               )  {


               }
               role : FormControl = new FormControl('',[
                Validators.required,
                Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                Validators.minLength(4),
                Validators.maxLength(20)
                ])

  ngOnInit(): void {

          // fetch actions from api
          this.privilegeService.getAllActions().subscribe(res=>{
          this.actions = res
          },err=>{
            console.log(err)
          })


          //fetch spaces from api
          this.privilegeService.getAllSpaces().subscribe(res=>{
            this.spaces = res
            },err=>{
              console.log(err)
            })


       // fetch all roles from api
            this.privilegeService.getAllRoles().subscribe(
              res=>{
               this.roles = res

              },err=>{
                console.log(err)
              }
            )
        }



        showModalDialog2() {
          this.displayModal2 = true;
        }

        showModalDialog3() {
          this.displayModal3 = true;
        }



        addRole(){

                this.privilegeService.createRole(this.role_name,this.selectedPriv).subscribe(
                  res=>{
                        console.log(res)
                        this.toastr.success('Role created successfully')
                        this.displayModal3 = false;
                        this.selectedPriv = []
                        this.role_name = ""

                        this.ngOnInit()

                      },err=>{
                    console.log(err)
                  })}




        selectSpace(space_id,event)
        {

            this.actions.map( elt =>{
            let id = '#'+space_id+elt.id
            $(id).prop('checked', event.target.checked);
            this.selectAction(space_id,elt.id,event)
        })}



        selectAction(space_id,action_id,event)
        {
              if(event.target.checked){
                let test = this.selectedPriv.find( elt => elt.action_id == action_id && elt.space_id == space_id)
                if(!test){
                  this.selectedPriv.push({
                      "space_id" : space_id,
                      "action_id":action_id
                  })
                }
              }else{

                $( "#"+space_id ).prop( "checked", false );
                let index = this.selectedPriv.findIndex(elt=> elt.action_id == action_id && elt.space_id == space_id);
                this.selectedPriv.splice(index , 1) ;
              }
              console.log(this.selectedPriv)
              let i = 0
              this.selectedPriv.map(elt=>{
                if (elt.space_id == space_id){
                  i++
                }
              })
               if(i == 4 && !($("#"+space_id).prop("checked")))
               {
                $( "#"+space_id ).prop( "checked", true );
               }

            }



        getSelectedRole(role) {
          this.selectedPriv = []
          this.idOfselectedRole = role.id
              this.role_name = role.role_name;
      this.privilegeService.getRoleprivileges(role.id).subscribe(
                        res => {
              this.role_privileges= res['0'].privilige


            setTimeout(() => {
              $( ".checkBox" ).prop( "checked", false );

              this.role_privileges.forEach(elem => {
                this.selectedPriv.push({
                  "space_id": elem.space_id,
                  "action_id": elem.action_id
                })

                let id = '#'+elem.space_id+elem.action_id

                $(id).prop('checked', true);

              })
            }, 0);


              },err=>{
                          console.log(err)
                        }
                      )



          this.displayModal = true;




              }





             updateRole()
             {
               this.privilegeService.updateRole(this.idOfselectedRole,this.role_name,this.selectedPriv).subscribe(
                 res=>{
                   console.log(res)
                   this.toastr.success("Updated!")
                 }, err =>{
                   console.log(err)
                 }
               )
              this.displayModal = false;
              this.ngOnInit()


             }



             hidemodal3()
             {
               this.selectedPriv = []
               this.displayModal = false
             }
             hideAddModal()
             {
               this.selectedPriv = []
               this.role_name = ""
               this.displayModal3 = false
             }


             deleteRole()
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

                   let roles_id = []
                   this.selectedRoles.map(el=>{
                    roles_id.push({
                      "role_id": el.id
                    })
                   })
                    this.privilegeService.deleteRole(roles_id).subscribe(
                      res=>{
                        console.log(res)
                        this.toastr.info("role deleted")
                        this.ngOnInit()



                      },err=>{
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
                 }

               })
             }
      NameValidator(){

        if(this.role_name)
        {
         this.nameValidator= false
        }else{
          this.nameValidator= true

        }
      }
    }
