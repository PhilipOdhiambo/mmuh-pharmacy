import { Injectable, inject } from '@angular/core';
import { Inventory } from './types';
import { BehaviorSubject, Observable } from 'rxjs';
import { UrlService } from './service/url.service';




@Injectable({
  providedIn: 'root'
})
export class TracerService extends UrlService {
  tracerList: Inventory[] = []
  $tracerList = new BehaviorSubject<Inventory[]>([])


  constructor() {
    super()
   }

  getAllTracerList():Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.url + "collection=tracer")
  }

  editTracer(id:number,value:number):Observable<Inventory[]>{
    let data = {Id:id,value}
    return this.http.post<Inventory[]>(this.url + "collection=tracer&method=update",JSON.stringify(data))
  }
}
