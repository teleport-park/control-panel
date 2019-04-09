import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './common/login-module/login.module';
import { NgxMaskModule } from 'ngx-mask';
import {IAppStorageInterface} from './interfaces/app-storage-interface';
import {AppStorageService} from './services/app-storage.service';
import {ApiUrlsService} from './services/api-urls.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    NgxMaskModule.forRoot()
  ],
  providers: [{
    provide: 'IAppStorageInterface',
    useClass: AppStorageService
    },
    {
      provide: 'IApiUrlsInterface',
      useClass: ApiUrlsService
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
