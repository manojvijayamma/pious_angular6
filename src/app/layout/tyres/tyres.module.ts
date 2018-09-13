import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TyresRoutingModule } from './tyres-routing.module';
import { TyresComponent } from './tyres.component';
import { PageHeaderModule } from './../../shared';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { DatePickerComponent} from './../../shared/modules/date-picker/date-picker.component';

import {
    
    ModalComponent
    
} from './components';

@NgModule({
    imports: [ NgbModule.forRoot(), CommonModule, TyresRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule],
    declarations: [TyresComponent, ModalComponent ]
})
export class TyresModule {}
