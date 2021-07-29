import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AgGridModule } from 'ag-grid-angular';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './shared/login/login.component';

import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { DashboardComponent } from './core/components/dashboard/dashboard.component';

import { ItemlistComponent } from './core/components/itemlist/itemlist.component';

import { MasteradminComponent } from './core/components/masteradmin/masteradmin.component';
import { AddMasterComponent } from './shared/dialogs/add-master/add-master.component';
import { AddItemComponent } from './shared/dialogs/add-item/add-item.component';
import { FeedbacklistComponent } from './core/components/feedbacklist/feedbacklist.component';
import { ButtonRendrerComponent } from './shared/components/button-rendrer/button-rendrer/button-rendrer.component';
import { PasswordComponent } from './shared/dialogs/password/password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getBAseUrl } from './core/providers/get_base_url';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MomentUtcDateAdapter } from './core/providers/mat_moment_provider';
import { allHttpInterceptorProviders } from './core/interceptors/interceptors';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers,metaReducers } from './store';
import { effects } from './store/effects';
import { HttpClientModule } from '@angular/common/http';
import { LoadingModule } from './modules/loading';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ItemtypelistComponent } from './core/components/itemtypelist/itemtypelist.component';
import { AddItemTypeComponent } from './shared/dialogs/add-item-type/add-item-type.component';
import { AddDashboardComponent } from './shared/dialogs/add-dashboard/add-dashboard.component';
import { ImageRendrer } from './shared/components/image-rendrer/image_rendrer';
import { ImageUploadComponent } from './shared/components/image-upload/image-upload.component';
import { SharedDirectivesModule } from './modules/directives-module/shared_directives.module';
import { SwitchCellRendrer } from './shared/components/switch_cell/switch_cell.view';
import { ConfirmationDialogComponent } from './shared/dialogs/confirmation-dialog/confirmation-dialog.component';

import { AddUserComponent } from './shared/dialogs/add-user/add-user.component';
import { PasswordEyeRendrerComponent } from './shared/components/password-eye-rendrer/password-eye-rendrer/password-eye-rendrer.component';
import { StatusRendrer } from './shared/components/status-rendrer/status_rendrer';
import { AdminUsersComponent } from './core/components/admin-users/admin-users.component';
import { NoDataComponent } from './shared/components/no-data/no-data.component';
import { MenuDropDownRendrer } from './shared/components/menudropdown_rendrer/menu_dropdown_rendrer';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ImageUploadComponent,
ImageRendrer,
ButtonRendrerComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    ItemlistComponent,
ImageUploadComponent,
    MasteradminComponent,
    AddMasterComponent,
    AddItemComponent,
    FeedbacklistComponent,
    PasswordComponent,

    ItemtypelistComponent,
    AddItemTypeComponent,
    ImageUploadComponent,
    AddDashboardComponent,
    SwitchCellRendrer,
    ConfirmationDialogComponent,

   AddUserComponent,
    StatusRendrer,
    PasswordEyeRendrerComponent,
    AdminUsersComponent,
    NoDataComponent,
    MenuDropDownRendrer,

  ],
  imports: [

    BrowserModule,
    MatTooltipModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedDirectivesModule,
    //mat module
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    NgxFileDropModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatSelectModule,

    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    //mat module
    NgxSpinnerModule,
    NgxFileDropModule,
    ImageCropperModule,
    ToastrModule,
    AgGridModule,
    NgxMaterialTimepickerModule,
    LoadingModule,

    HttpClientModule,
    CKEditorModule,

    StoreModule.forRoot(reducers,{
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot(effects),
    AgGridModule.withComponents([]),
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    { provide: 'BASE_API_URL', useFactory: getBAseUrl, deps: [] },
    ...allHttpInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
