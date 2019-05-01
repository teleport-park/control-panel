import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthModule } from './common/auth-module/auth.module';
import { NgxMaskModule } from 'ngx-mask';
import { IAppStorageInterface } from './interfaces/app-storage-interface';
import { AppStorageService } from './services/app-storage.service';
import { ApiUrlsService } from './services/api-urls.service';
import { AuthInterceptor } from './common/auth-module/interceptors/auth.interceptor';
import { ErrorInterceptor } from './common/auth-module/interceptors/error.interceptor';

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
    AuthModule,
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
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
