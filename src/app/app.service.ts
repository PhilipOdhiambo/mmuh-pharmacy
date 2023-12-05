import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'https://script.google.com/macros/s/AKfycbyvi6qXrDFHAtJmlePVk5S5gWv9v6y2IP0T0x86HwlroaN0eSUar1VEBc2nABWd5oF7mg/exec?'

  constructor(private http:HttpClient) { }
  doGet(params:string):Observable<any> {
    return this.http.get(this.url + params)
  }

  doPost(method:string, data:any):Observable<any> {
    return this.http.post(this.url + 'method=' + method, data)
  }



}
