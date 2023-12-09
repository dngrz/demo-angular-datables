import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor() {}

  readExcelFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = (event: any) => {
        try {
          const data = event.target.result as string;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          //const excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
          const excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
          resolve(excelData);
        } catch (e) {
          reject(e);
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

      fileReader.readAsBinaryString(file);
    });
  }
}
