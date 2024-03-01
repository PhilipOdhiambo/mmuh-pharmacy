import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take, lastValueFrom, Subject, BehaviorSubject, Subscription, forkJoin,} from 'rxjs';
import { map} from 'rxjs/operators'
import { Inventory, OutOfStock, WorkloadTransaction } from './types';
import { Firestore,docData, doc,setDoc } from '@angular/fire/firestore';
import { UrlService } from './service/url.service';


@Injectable({
  providedIn: 'root'
})
export class AppService extends UrlService {
  subject = new Subject()
  $inventory = new BehaviorSubject<any>([])
  $workloadTransactions = new BehaviorSubject<any>([])
  inventorySubscription?:Subscription;

  constructor(
    private firestore:Firestore,
    ) { 
      super()
      // this.firestoreDocToBehaviorSubject('inventory/workloadTransactions','workloadTransactions',this.$workloadTransactions)    
      // this.firestoreDocToBehaviorSubject('inventory/inventory','inventory',this.$inventory) 
    }


    // googleSheetOutpatientsToFirestore() {
    //   this.doGet("collection=outpatients").subscribe(res => {
    //     this.setFirebaseDoc('inventory/workloadTransactions',{workloadTransactions:JSON.stringify(res)})
    //   })

    // }


 
    firestoreDocToBehaviorSubject(documentPath:string,field:string,behaviorSubject:BehaviorSubject<any>) {
      docData(doc(this.firestore, documentPath)).subscribe((res) => {
        if(res) {          
          behaviorSubject.next(JSON.parse(res[field]))
        }      
      })
    }

    // Delete workload Transaction
    deleteWorkloadTrans(id:string) {
      // Read the present value and convert it to a json array    
      let data = this.$workloadTransactions.getValue() as WorkloadTransaction []      
      let jsonArray = JSON.stringify(data.filter(data => data.id != id))
      
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

  // getWorkload(cartegory:string ) {
  //   const request$ = this.doGet("sheetName=outpatients")
  //   .pipe(
  //     map(oupatients => oupatients.filter((p:any) => p.Cartegory == cartegory))
  //   )
  //   return lastValueFrom(request$)

  // }

  // Get next tally number from the server for any category
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



