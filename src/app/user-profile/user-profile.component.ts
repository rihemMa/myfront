import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  users
  userForm: FormGroup;
  passwordForm: FormGroup;
  userId
  user
  passwordChange
  isCorrect = false
  constructor(private userService: UserService, private toastr: ToastrService ,private fb:FormBuilder,) {
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
      phone_number : new FormControl ('',[
            Validators.required,
            Validators.pattern("[0-9 .'-]+"),
          ]),
      password : new FormControl ('',[
            Validators.required,
            Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                  ]),
      description: new FormControl ('',[
        Validators.required,
        Validators.pattern("[A-Z a-z 0-9 .'-]+"),
              ]),
            }
            let formControl = {

              oldPass : new FormControl('',[
                 Validators.required,
                   ]),

              newPass : new FormControl ('',[
                Validators.required,
                Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                Validators.minLength(8),
                  ]),
              confirmNew : new FormControl ('',[
                 Validators.required,
                 Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                 Validators.minLength(8),
                  ]),

                    }

        this.userForm = this.fb.group(formControls) ;
        this.passwordForm = this.fb.group(formControl) ;
  }
  //user
      get name(){ return this.userForm.get('name') }
      get phone_number(){ return this.userForm.get('phone_number') }
      get email(){ return this.userForm.get('email') }
      get password(){ return this.userForm.get('password') }
      get description(){ return this.userForm.get('description') }

  //password
      get oldPass(){ return this.passwordForm.get('oldPass') }
      get newPass(){ return this.passwordForm.get('newPass') }
      get confirmNew(){ return this.passwordForm.get('confirmNew') }
  ngOnInit(): void {
    this.userService.getusers().subscribe(
      res=>{
        this.users = res[0]
        this.userId= this.users.id
        // console.log(this.users);
        this.user = res
        this.userForm.patchValue({
          name: this.users.name,
          email : this.users.email,
          password : this.users.password,
          phone_number:this.users.phone_number,
          description:this.users.description,
         })

      },err=>{
        console.log(err);
      }
    )
  }

  clear(){
    this.userForm.reset();
    this.toastr.error("Profile infos are cleared,rewrite your infos and save!")
  }


  changePassword()
{
    let currentPassword = this.passwordForm.get('oldPass').value
    let newPass = this.passwordForm.get('newPass').value
    if( newPass)
    {
    this.userService.updatePassword( currentPassword, newPass).subscribe(
      res => {
      console.log(res.status);

      if(res.status == 0){
        this.isCorrect = true

      }else {
      this.toastr.success("Password updated")
      this.passwordForm.reset()
      this.isCorrect  = false

      }
      }, err => {
        console.log(err);

      }
    )

    }else{

    }
    let data = this.userForm.value
    this.userService.updateUser(this.userId ,data).subscribe(
      res => {
        // console.log(this.userId);
        this.toastr.success("User Profile Infos Are Updated!")
        this.ngOnInit()
          }, err => { console.log(err) }
          )
   }

}
