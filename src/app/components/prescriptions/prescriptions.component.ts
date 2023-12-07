import { Component } from '@angular/core';
import { TimeEditModalComponent } from '../time-edit-modal/time-edit-modal.component';
import { AppService } from '../../app.service';
import {map} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { PrescriptionsNewComponent } from '../prescriptions-new/prescriptions-new.component';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [
    TimeEditModalComponent,
    DatePipe,PrescriptionsNewComponent
  ],
  templateUrl: './prescriptions.component.html',
  styleUrl: './prescriptions.component.css'
})
export class PrescriptionsComponent {

  activeRow:any
  prescriptions:any = []
  constructor(private dataService:AppService) {}

  ngOnInit() {
    this.dataService.doGet("sheetName=outpatients")
    .pipe(
      map(oupatients => oupatients.filter((p:any) => p.Cartegory == 'prescription'))
    )
    .subscribe(pres => this.prescriptions= pres)
  }

  activePresc(editField:string,presc:any){
    this.activeRow.prescript = presc
    this.activeRow.editField = editField
  }

}




