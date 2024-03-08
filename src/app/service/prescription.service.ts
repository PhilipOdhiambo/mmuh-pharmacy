import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { PrescriptionI } from '../types';




@Injectable({
  providedIn: 'root'
})
export class PrescriptionService extends UrlService {

  constructor() {
    super()
  }

  fetchAll(): Observable<PrescriptionI[]> {
    return this.http.get<PrescriptionI[]>(this.url + "collection=precription")
  }

  fetchOne(id:string):Observable<PrescriptionI> | null {
    
    return this.http.post<PrescriptionI>(this.url + "collection=prescription", id)
  }

  create(presc: PrescriptionI) {
    
    return this.http.post<PrescriptionI[]>(this.url + "collection=prescription&method=create", JSON.stringify(presc))

  }

  edit(presc: PrescriptionI): Observable<PrescriptionI[]> {
    let data = presc
    return this.http.post<PrescriptionI[]>(this.url + "collection=prescription&method=update", JSON.stringify(data))
  }
}
