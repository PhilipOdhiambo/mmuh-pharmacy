import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  styles:``,
  template: `
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="close()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="name-input" class="col-form-label">Name:</label>
              <input type="text" class="form-control" id="name-input" #nameInput [(ngModel)]="name" name="name">
            </div>
            <div class="form-group">
              <label for="email-input" class="col-form-label">Email:</label>
              <input type="email" class="form-control" id="email-input" #emailInput [(ngModel)]="email" name="email">
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Message:</label>
              <textarea class="form-control" id="message-text" #messageText [(ngModel)]="message" name="message"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="close()">Close</button>
          <button type="button" class="btn btn-primary" (click)="submit()">Submit</button>
        </div>
      </div>
    </div>
  </div>
  `,
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

