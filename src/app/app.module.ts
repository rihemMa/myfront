import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxNumToWordsModule } from 'ngx-num-to-words';

//Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { BillsComponent } from './files/bills/bills.component';
import { ContractsComponent } from './files/contracts/contracts.component';
import { OthersComponent } from './files/others/others.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { RolesComponent } from './roles/roles.component';
import { PaperManagerComponent } from './paper-manager/paper-manager.component';
import { CompanyComponent } from './company/company.component';
import { AddPaperComponent } from './components/add-paper/add-paper.component';
import { CreateBillComponent } from './create-bill/create-bill.component';

//primeNG imports
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {SidebarModule} from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {SplitterModule} from 'primeng/splitter';
import { TagModule } from 'primeng/tag';
import {BadgeModule} from 'primeng/badge';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {EditorModule} from 'primeng/editor';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AddBillComponent } from './files/add-bill/add-bill.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { LoginComponent } from './login/login.component';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideNavComponent,
    LayoutComponent,
    DashboardComponent,
    UsersComponent,
    ClientsComponent,
    ProjectsComponent,
    BillsComponent,
    ContractsComponent,
    OthersComponent,
    RolesComponent,
    AddBillComponent,
    LoginComponent,
    PaperManagerComponent,
    CompanyComponent,
    AddPaperComponent,
    CreateBillComponent,
    UserProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutoCompleteModule,
    ButtonModule,
    MenubarModule,
    SplitButtonModule,
    SidebarModule,
    BrowserAnimationsModule,
    InputTextModule,
    CardModule,
    CarouselModule,
    HttpClientModule,
    SplitterModule,
    TagModule,
    BadgeModule,
    TableModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    EditorModule,
    FormsModule,
    SplitButtonModule,
    AutoCompleteModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxNumToWordsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
