import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'https://script.google.com/macros/s/AKfycbyvi6qXrDFHAtJmlePVk5S5gWv9v6y2IP0T0x86HwlroaN0eSUar1VEBc2nABWd5oF7mg/exec?'

  constructor(private http: HttpClient) { }
  doGet(params: string): Observable<any> {
    return this.http.get(this.url + params)
  }

  doPost(sheetName:string, method: string, data: any) {
    this.http.post(this.url + sheetName + '&' + method, JSON.stringify(data)).subscribe(res => res)
  }

  getUtils() {
    const request$ = this.doGet('utils=true').pipe(take(1))
    return lastValueFrom(request$).then(data => {
      // data.nn = 'dff'
      return data;
    })
  }

  getNextTally(param: string) {
    const $request = this.doGet(param).pipe(
      take(1),
      map(arr => arr.reduce((acc: any, curr: any) => {
        if (!acc.length || curr.Date > acc[0].Date) {
          return [curr];
        } else if (curr.Date == acc[0].Date) {
          acc.push(curr);
        }
        return acc;
      }, [])),
      map(data => data.reduce((prev: any, curr: any) => {
        return curr.tallyNo > prev.tallyNo ? curr : prev;
      })
      )
    )
    return lastValueFrom($request).then(obj => {
      const lastDate = new Date(obj.Date).getDate()
      const todayDate = new Date().getDate()

      if (lastDate < todayDate) {
        const tallyNo: number = 1
        return tallyNo
      }
      return parseInt(obj.tallyNo.replace(/\D/g, '')) + 1
    })
  }

}



