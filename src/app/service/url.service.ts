import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  protected url = 'https://script.google.com/macros/s/AKfycbxPgcff46jONx9cQJkE_Ypbo2NDDulxkDfVI3K0TB1kIa3BUR6MLql4PTkgLb4x4gBcGg/exec?'
  protected http = inject(HttpClient)

  constructor() {

   }
  
}
