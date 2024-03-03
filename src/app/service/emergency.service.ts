import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { PrescriptionI } from '../types';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService extends UrlService {

  constructor() {
    super();
  }

  fetchAll(): Observable<PrescriptionI[]> {
    return this.http.get<PrescriptionI[]>(this.url + "collection=emergency")
  }

  create(presc: PrescriptionI) {
    
    return this.http.post<PrescriptionI[]>(this.url + "collection=emergency&method=update", JSON.stringify(presc))

  }

  edit(presc: PrescriptionI): Observable<PrescriptionI[]> {
    let data = presc
    return this.http.post<PrescriptionI[]>(this.url + "collection=emergency&method=update", JSON.stringify(data))
  }
}
