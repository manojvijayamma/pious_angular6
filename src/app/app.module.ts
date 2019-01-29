import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { AuthInterceptor } from './shared';

//services
import { UserService } from './shared/services/user.service';
import { ResponseService } from './shared/services/response.service';
import { SpinnerService } from './shared/services/spinner.service';
import { AlertService } from './shared/services/alert.service';
import { TyreService } from './shared/services/tyre.service';
import { AddressService } from './shared/services/address.service';
import { OrderService } from './shared/services/order.service';

//import { AgmCoreModule } from '@agm/core';
//import { GooglePlaceModule } from "ngx-google-places-autocomplete";



// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule, 
        ReactiveFormsModule,
       
        
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [UserService, ResponseService,SpinnerService, AuthGuard, TyreService, AlertService, OrderService, AddressService,
        {
            provide : HTTP_INTERCEPTORS,
            useClass : AuthInterceptor,
            multi : true
          }
    ],

    bootstrap: [AppComponent]
})
export class AppModule {}
