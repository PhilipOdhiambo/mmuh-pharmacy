import { Component,ElementRef,Input, ViewChild, EventEmitter, Output, OnInit, AfterViewInit} from '@angular/core';
import { AppService } from '../../services/app.service';
import {FormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-time-edit-modal',
  standalone: true,
  imports: [FormsModule,DatePipe],
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

  newDate = new Date()

  constructor(private service:AppService) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      
    switch(this.activeRow.editField) {
      case 'billTimein':
        this.billStart.nativeElement.value = new Date().toLocaleString()
        this.billStart.nativeElement.scrollIntoView({
          behavior:'auto',
          block:'center',inline:'center'
        })
        this.billStart.nativeElement.focus();
        break;

      case 'billTimeout':
        this.billEnd.nativeElement.scrollIntoView({
          behavior:'auto',
          block:'center', inline: 'center'
        })
        this.billEnd.nativeElement.focus();
        break;

      case 'dispenseTimein':
        this.dispStart.nativeElement.scrollIntoView({
          behavior:'auto',
          block:'center', inline:'center'
        })
        this.dispStart.nativeElement.focus();
        break;

      case 'dispenseTimeout':
        this.dispEnd.nativeElement.scrollIntoView({
          behavior:'auto',
          block:'center', inline:'center'
        })
        this.dispEnd.nativeElement.focus();
        break;
    }
  }

  save(event:Event) {

    this.service.saveOutpatient(this.activeRow.prescription)
    const target = event.target as HTMLButtonElement
    target.disabled = true
    this.close()
  }

  close() {
    this.onModalClose.emit(true)
  }
  


}
