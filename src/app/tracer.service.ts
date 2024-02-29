import { Injectable, inject } from '@angular/core';
import { Inventory } from './types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class TracerService {
  tracerList: Inventory[] = []
  $tracerList = new BehaviorSubject<Inventory[]>([])

  protected url = 'https://script.google.com/macros/s/AKfycbyMsZATCfxRZVP6kbeS34tTpHGOESRFYLNGoqquTQXHPWD0_MaNtzHTUvfPO7RfVHFA/exec?'

  constructor(private http:HttpClient) {
    
   }

  getAllTracerList():Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.url + "collection=tracer")
  }

  editTracer(id:string,value:number):Observable<Inventory[]>{
    let data = {Id:id,value}
    return this.http.post<Inventory[]>(this.url + "collection=tracer&method=update",JSON.stringify(data))
  }
}
