import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ExcelService } from 'src/app/service/excel.service';
import * as config from 'src/app/util/config';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-data-load',
  templateUrl: './data-load.component.html',
  styleUrls: ['./data-load.component.css']
})
export class DataLoadComponent implements OnInit, AfterViewInit, OnDestroy {

  sub!: Subscription;
  excelData!: any[];
  columns: string[] = [];
  dtOptions : DataTables.Settings = config.dtOptions;
  @ViewChild(DataTableDirective, {static: false}) dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private excelService: ExcelService) {}

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.excelService.readExcelFile(file)
      .then((excelData) => {
        console.log("data loaded");
        this.excelData = excelData;
      })
      .then(() => this.rerender())
      .catch((error) => {
        console.error('Error al leer el archivo Excel:', error);
      });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(this.excelData);
    });
  }

  editar(indice: number) {
    console.log("editar() "+indice);
    this.excelData[indice].selected = false;
  }

  eliminar(indice: number): void {
    if (indice > -1) {
      console.log("eliminar() "+indice);
      this.excelData.splice(indice, 1);
      this.rerender();
    }
  }

  getColumnKeys(data: any[]): string[] {
    if (!data || data.length === 0) {
      return [];
    }
    return Object.keys(data[0]); // Obtener las claves de la primera fila (asumiendo que tienen las mismas claves)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
    console.log("do ngAfterViewInit")
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe(); // Desuscribirse del Subject al destruir el componente
  }

}

