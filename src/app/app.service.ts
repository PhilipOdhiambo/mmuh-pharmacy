import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take, lastValueFrom, Subject, BehaviorSubject, Subscription,} from 'rxjs';
import { map} from 'rxjs/operators'
import { WorkloadTransaction } from './types';
import { Firestore,docData, doc,setDoc, Timestamp } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'https://script.google.com/macros/s/AKfycbzPJ75D_tyT18zLgJP4oedBCY9AekwO1GkaztuODzpJJhx12hbopUFs1XrfwUAuR-iPJQ/exec?'
  subject = new Subject()
  $inventory = new BehaviorSubject<any>([])
  $workloadTransactions = new BehaviorSubject<any>([])
  inventorySubscription?:Subscription;

  constructor(
    private http: HttpClient,
    private firestore:Firestore,
    ) { 
      this.firestoreDocToBehaviorSubject('inventory/workloadTransactions','workloadTransactions',this.$workloadTransactions)    
      this.firestoreDocToBehaviorSubject('inventory/inventory','inventory',this.$inventory)    
    }


    googleSheetOutpatientsToFirestore() {
      this.doGet("sheetName=outpatients").subscribe(res => {
        this.setFirebaseDoc('inventory/workloadTransactions',{workloadTransactions:JSON.stringify(res)})
      })

    }
    
 
    firestoreDocToBehaviorSubject(documentPath:string,field:string,behaviorSubject:BehaviorSubject<any>) {
      docData(doc(this.firestore, documentPath)).subscribe((res) => {
        if(res) {          
          behaviorSubject.next(JSON.parse(res[field]))
        }      
      })
    }
    

  doGet(params: string): Observable<any> {
    
    return this.http.get(this.url + params)
  }

  setFirebaseDoc(docPath:string,data:any) {
    return setDoc(doc(this.firestore,docPath),data)
  }

  doPost(sheetName:string, method: string, data: any) {
     let $res = this.http.post(this.url + 'sheetName=' + sheetName + '&method=' + method, JSON.stringify(data))
    return lastValueFrom($res)
  }

  getUtils() {
    const request$ = this.doGet('utils=true').pipe(take(1))
    return lastValueFrom(request$).then(data => {
      return data;
    })
  }

  getWorkload(cartegory:string ) {
    const request$ = this.doGet("sheetName=outpatients")
    .pipe(
      map(oupatients => oupatients.filter((p:any) => p.Cartegory == cartegory))
    )
    return lastValueFrom(request$)

  }


  getNextTally(param: string,cartegory:string) {
    const $request = this.doGet(param).pipe(
      map(arr => arr.reduce((acc:any,next:any)=>{
        let curr = next as WorkloadTransaction;
       if (((new Date(curr.Date)).toLocaleDateString() == (new Date()).toLocaleDateString()) &&  (curr.Cartegory == cartegory)) {
         let currTallyNo = parseInt(curr.tallyNo!.replace(/\D/g, ''))
         return currTallyNo > acc ? currTallyNo : acc
       }
       return acc;
     }, 0))
    )
    return lastValueFrom($request).then(res => res + 1)
  }


  saveOutpatient(opdDoc:any) {
    this.doPost('outpatients','update',[opdDoc])
  }

}



