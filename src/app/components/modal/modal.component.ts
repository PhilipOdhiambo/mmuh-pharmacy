import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
})
export class ModalComponent implements AfterViewInit {

  @Input('data') data!: string; // the input data from the parent component
  @Output() result = new EventEmitter<any>(); // the output data to the parent component

  @ViewChild('nameInput') nameInput!: ElementRef; // the reference to the name input element
  @ViewChild('emailInput') emailInput!: ElementRef; // the reference to the email input element
  @ViewChild('messageText') messageText!: ElementRef; // the reference to the message textarea element

  name: string =''; // the name value
  email: string = ''; // the email value
  message: string =''; // the message value

  constructor() { }

  ngAfterViewInit() {
    // set the focus on the input element based on the data
    switch (this.data) {
      case 'name':
        this.nameInput.nativeElement.focus();
        break;
      case 'email':
        this.emailInput.nativeElement.focus();
        break;
      case 'message':
        this.messageText.nativeElement.focus();
        break;
      default:
        break;
    }
  }

  // close the modal and emit the result
  close() {
    this.result.emit({ action: 'close' });
  }

  // submit the form and emit the result
  submit() {
    this.result.emit({ action: 'submit', data: { name: this.name, email: this.email, message: this.message } });
  }

}

