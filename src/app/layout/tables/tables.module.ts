import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageHeaderModule } from './../../shared';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { DatePickerComponent} from './../../shared/modules/date-picker/date-picker.component';

import {
    
    ModalComponent
    
} from './components';

@NgModule({
    imports: [ NgbModule.forRoot(), CommonModule, TablesRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule],
    declarations: [TablesComponent, ModalComponent ]
})
export class TablesModule {}
