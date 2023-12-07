import { Component,OnChanges,ElementRef,Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-time-edit-modal',
  standalone: true,
  imports: [],
  templateUrl: './time-edit-modal.component.html',
  styleUrl: './time-edit-modal.component.css'
})
export class TimeEditModalComponent implements OnChanges {
  @Input('activeRow')
  activeRow?:any;

  @ViewChild('billStart')
  billStart!:ElementRef<HTMLInputElement>

  @ViewChild('billEnd')
  billEnd!:ElementRef<HTMLInputElement>

  @ViewChild('dispStart')
  dispStart!:ElementRef<HTMLInputElement>

  @ViewChild('dispEnd')
  dispEnd!:ElementRef<HTMLInputElement>

  ngOnChanges(): void {
    if (!this.activeRow) {
      return
    }
    switch(this.activeRow.editField) {
      case 'billStart':
        this.billStart.nativeElement.focus();
        break;
      case 'billEnd':
        this.billStart.nativeElement.focus();
        break;
      case 'dispStart':
        this.billStart.nativeElement.focus();
        break;
      case 'dispEnd':
        this.billStart.nativeElement.focus();
        break;
    }
  }
  


}
