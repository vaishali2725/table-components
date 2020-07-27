import { NgModule } from '@angular/core';
import { TableComponentsComponent } from './table-components.component';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [TableComponentsComponent],
  imports: [
    CommonModule,
    DataTablesModule
  ],
  providers: [
    DatePipe,
  ],
  exports: [TableComponentsComponent]
})
export class TableComponentsModule { }
