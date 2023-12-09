import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLoadComponent } from '../pages/data-load/data-load.component';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    DataLoadComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
  ]
})
export class LayoutModule { }
