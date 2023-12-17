import { Component,OnChanges,ElementRef,Input, ViewChild, EventEmitter, Output, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-time-edit-modal',
  standalone: true,
  imports: [],
  templateUrl: './time-edit-modal.component.html',
  styleUrl: './time-edit-modal.component.css'
})
export class TimeEditModalComponent implements OnInit,AfterViewInit {
  @Input() activeRow?:any;

  @ViewChild('billTimein') billStart!:ElementRef<HTMLInputElement>

  @ViewChild('billTimeout') billEnd!:ElementRef<HTMLInputElement>

  @ViewChild('dispenseTimein') dispStart!:ElementRef<HTMLInputElement>

  @ViewChild('dispenseTimeout') dispEnd!:ElementRef<HTMLInputElement>

  @Output() onModalClose = new EventEmitter()

  constructor(private element:ElementRef) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      
    switch(this.activeRow.editField) {
      case 'billTimein':
        this.billStart.nativeElement.scrollIntoView()
        this.billStart.nativeElement.focus();
        break;
      case 'billTimeout':
        this.billEnd.nativeElement.scrollIntoView()
        this.billEnd.nativeElement.focus();
        break;
      case 'dispenseTimein':
        this.dispStart.nativeElement.scrollIntoView()
        this.dispStart.nativeElement.focus();
        break;
      case 'dispenseTimeout':
        this.dispEnd.nativeElement.scrollIntoView()
        this.dispEnd.nativeElement.focus();
        break;
    }
  }

  close() {
    this.onModalClose.emit(true)
  }
  


}
