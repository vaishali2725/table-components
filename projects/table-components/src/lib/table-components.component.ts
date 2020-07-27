import { Component, OnInit, Input  } from '@angular/core';
import { ExcelService } from './_services/excel.service';

@Component({
  selector: 'lib-table-components',
  templateUrl:'./table-components.component.html',
  styles: [
  ]
})
export class TableComponentsComponent implements OnInit {

   @Input() columns:string[];
   @Input() rows: any[];
   @Input() dataOptions: {};
   @Input() btnOptions: string[];

   isDataLoaded = false;
   exportToExcelBtn = false;
   exportToCsvBtn = false;
   printBtn = false;
   copyToClipBoardBtn = false;

   dtOptions: DataTables.Settings = {};

  constructor(private excelService: ExcelService,) { }

  ngOnInit(): void {
    this.dtOptions = {
      processing: true
    };

    setTimeout(()=>{
      this.isDataLoaded = true;
      this.dtOptions = this.dataOptions;
      console.log(this.btnOptions);
      if(this.btnOptions.includes('exportToExcel')){
        this.exportToExcelBtn = true;
      }
      if(this.btnOptions.includes('exportToCsv')){
        this.exportToCsvBtn = true;
      }
      if(this.btnOptions.includes('print')){
        this.printBtn = true;
      }
      if(this.btnOptions.includes('copyToClipboard')){
        this.copyToClipBoardBtn = true;
      }
    }, 2000);

  }

  downloadData(fileType) {
    let title = 'User Data';
    let header = this.columns;
    let data = this.rows;
    let result = data.map(o => Object.keys(o).map(k => o[k]));
    this.excelService.downloadData(title, header, result, fileType);
  }

}
