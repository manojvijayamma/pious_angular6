import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { PageHeaderModule } from './../../shared';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { DatePickerComponent} from './../../shared/modules/date-picker/date-picker.component';

import {
    
    ModalComponent
    
} from './components';

@NgModule({
    imports: [ NgbModule.forRoot(), CommonModule, OrdersRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule],
    declarations: [OrdersComponent, ModalComponent ]
})
export class OrdersModule {}
