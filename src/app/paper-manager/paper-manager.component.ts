import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PaperTypeService } from '../services/paper-type.service';
import { ProjectService } from '../services/project.service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-paper-manager',
  templateUrl: './paper-manager.component.html',
  styleUrls: ['./paper-manager.component.scss']
})
export class PaperManagerComponent implements OnInit {

  addNewPaperModal
  updatePaperModal
  paperForm : FormGroup
  papersType
  projects
  papers
  selectedPapers
  selectedPaper
  selectedPaperId
  status_paper
  files

  constructor( private fb:FormBuilder,
                private toastr :ToastrService,
                private paperTypeService:PaperTypeService,
                private projectService: ProjectService,
                private configService:ConfigService) {


                  let formControls = {

                    paper_name : new FormControl('',[
                      Validators.required,
                      Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                      Validators.minLength(4),
                      Validators.maxLength(16)
                        ]),
                    paper_type : new FormControl('',[
                        Validators.required,

                            ]),
                    expiration_date : new FormControl('',[
                        Validators.required,
                                  ]),
                    description : new FormControl('',[

                          ]),

                     project_id : new FormControl('',[
                            Validators.required,
                                ]),
                      status : new FormControl('',[
                                  Validators.required,
                                      ]),
                                      file : new FormControl('',[
                                      ]),

                            }
                    this.paperForm = this.fb.group(formControls) ;

                }

              get paper_name() { return this.paperForm.get('paper_name') }
              get paper_type() { return this.paperForm.get('paper_type') }
              get expiration_date() { return this.paperForm.get('expiration_date')}
              get description() { return this.paperForm.get('description')}
              get project_id() { return this.paperForm.get('project_id')}
              get status() { return this.paperForm.get('status')}
              get file() { return this.paperForm.get('file')}


  ngOnInit(): void {

    this.paperTypeService.getPaperTypes().subscribe(
      res=>{
       this.papersType = res

        }, err =>{
        console.log(err)
      }
    )
    this.projectService.getProjectsWithinfo().subscribe(
      res =>{
      this.projects = res
 }, err =>{
        console.log(err)
      }
    )

    this.paperTypeService.getPapers().subscribe(
      res=>{
        this.papers =  res
      }, err=>{
        console.log(err)
      }
    )


    this.status_paper= this.configService.status_paper
  }

  showAddPaperModal()
  {
    this.addNewPaperModal = true
    this.paperForm.reset()
  }



  getSelectedPaper(paper)
  {
    this.selectedPaperId = paper.id
    this.updatePaperModal = true
    this.paperForm.patchValue({
      paper_name: paper.paper_name,
      paper_type:paper.paper_type.id,
      expiration_date : paper.expiration_dat,
      project_id : paper.project.id,
      description : paper.description,
      status : paper.status,
      })


  }

  updatePaper()
  {
              let newPaper = this.paperForm.value
              this.paperTypeService.updatePaper(this.selectedPaperId,newPaper).subscribe(
                res => {
                  console.log(res)
                  this.toastr.success('Paper Updated!')
                  this.updatePaperModal = false
                  this.ngOnInit()
                }, err => {
                  console.log(err)
                }
              )
  }





  deletePaper(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Have Project for that client Do you want to delete it!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        let papers_id = []
        this.selectedPapers.map(el=>{
        papers_id.push({
          "paper_id": el.id
        })
        })
        console.log(papers_id)
        this.paperTypeService.deletePaper(papers_id).subscribe(
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



        filterStatus(id)
        {
          let status =  this.status_paper.find( el => el.id == id )
          return status
        }


        updatePage(){
    this.ngOnInit()
  this.paperForm.reset()
  this.addNewPaperModal = false
}

  hideTheModal()
  {
    this.addNewPaperModal = false


  }


  test(tes)
  {
    console.log(tes)
  }


  uploadFile(event)
  {
    this.files = event.target.files[0]

  }
    }
