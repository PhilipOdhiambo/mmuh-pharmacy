import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  protected url = 'https://script.google.com/macros/s/AKfycbzdMBZyTfJOChThAygTGdO7uWIDqnmTOrn4V1Z7wF1Tp5XVGJIBxxUj_601S9GhCjcHwA/exec?'  
  protected http = inject(HttpClient)
  constructor() {

   }
  
}
