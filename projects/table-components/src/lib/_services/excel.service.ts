import { Injectable } from '@angular/core';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor(private datePipe: DatePipe) {
  }

  downloadData(title, header, data, fileType) {

    //Create workbook and worksheet
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Car Data');

    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true }
    worksheet.addRow([]);
    let subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')])
 
    worksheet.mergeCells('A1:D2');
    
    //Blank Row 
    worksheet.addRow([]);
    
    //Add Header Row
    let headerRow = worksheet.addRow(header);
    
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })
    
    // worksheet.addRows(data);
    // Add Data and Conditional Formatting
    data.forEach(d => {
      worksheet.addRow(d);
    });

    worksheet.addRow([]);
  
    if(fileType == 'csv'){

      //Generate CSV File with given name
      let csv = workbook.csv as any; // workaround
      csv.writeBuffer({delimiter: ";"}).then(function(buffer) {
          fs.saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Data.csv");
      });
  
    }else{
      //Generate Excel File with given name
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, title+'.xlxs');
      })
    }

  }
}