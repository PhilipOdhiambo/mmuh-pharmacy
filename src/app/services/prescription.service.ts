import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { PrescriptionI } from '../types';


@Injectable({
  providedIn: 'root',

})
export class PrescriptionService extends UrlService {
  prescriptions = new BehaviorSubject<PrescriptionI[]>([])
  activePresc = new BehaviorSubject<PrescriptionI>({} as PrescriptionI)

  constructor() {
    super()
  }

  fetchAll() {
    this.http.get<PrescriptionI[]>(this.url + "collection=prescription").subscribe(res => {
      this.prescriptions.next(res)
    })
  }

  fetchOne(id: string) {

    return this.http.post<PrescriptionI>(this.url + "collection=prescription&method=fetchOne", JSON.stringify(id))
      .pipe(take(1))

  }

  async create(presc: PrescriptionI) {
    this.http.post<PrescriptionI[]>(this.url + "collection=prescription&method=create", JSON.stringify(presc))
      .subscribe(res => this.prescriptions.next(res))

  }

  async edit(presc: PrescriptionI) {
    this.http.post<PrescriptionI[]>(this.url + "collection=prescription&method=update", JSON.stringify(presc))
      .subscribe(res => this.prescriptions.next(res))
  }

  async deleteOne(timestamp:string) {
    this.http.post(this.url + "collection=prescription&method=delete", JSON.stringify(timestamp))
      .subscribe(res => console.log(res))
  }

  deleteAll() {
    // To be implemented
  }
}
