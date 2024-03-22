import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { TSheetI } from '../types';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class tSheetservice extends UrlService {
  tSheets = new BehaviorSubject<TSheetI[]>([])

  constructor() {
    super();
  }
  
  fetchAll() {
    this.http.get<TSheetI[]>(this.url + "collection=tSheet").subscribe(res => {
      this.tSheets.next(res)
    })
  }

  fetchOne(id: string) {

    return this.http.post<TSheetI>(this.url + "collection=tSheet&method=fetchOne", JSON.stringify(id))
      .pipe(take(1))

  }

  async create(presc: TSheetI) {
    this.http.post<TSheetI[]>(this.url + "collection=tSheet&method=create", JSON.stringify(presc))
      .subscribe(res => this.tSheets.next(res))

  }

  async edit(presc: TSheetI) {
    this.http.post<TSheetI[]>(this.url + "collection=tSheet&method=update", JSON.stringify(presc))
      .subscribe(res => this.tSheets.next(res))
  }

  async deleteOne(timestamp:string) {
    this.http.post(this.url + "collection=tSheet&method=delete", JSON.stringify(timestamp))
      .subscribe(res => console.log(res))
  }

  deleteAll() {
    // To be implemented
  }

}
