 export interface WorkloadTransaction {
    id:string | null
    Date:Date 
    Cartegory?:string 
    tallyNo?: string
    noOfDocs?:number
    itemsOrdered?:number
    itemsOs?:number
    osSubstituted?:number
    itemsIssued?:number
    fillRatePercent?:number
    billStart?:Date
    billEnd?:Date
    dispenseStart?:Date
    dispenseEnd?:Date
    user?:string
}
 export interface PrescriptionI {
    id:string | null
    Date:Date 
    tallyNo?: string
    noOfDocs?:number
    itemsOrdered?:number
    itemsOs?:number
    osSubstituted?:number
    itemsIssued?:number
    fillRatePercent?:number
    billStart?:Date
    billEnd?:Date
    dispenseStart?:Date
    dispenseEnd?:Date
    user?:string
}
 export interface TSheetI {
    id:string | null
    Date:Date 
    tallyNo?: string
    noOfDocs?:number
    itemsOrdered?:number
    itemsOs?:number
    osSubstituted?:number
    itemsIssued?:number
    fillRatePercent?:number
    startAt?:Date
    completeAt?:Date
    ward:string
    user?:string
}
 export interface EmergencyI {
    id:string | null
    Date:Date 
    tallyNo?: string
    noOfDocs?:number
    itemsOrdered?:number
    itemsOs?:number
    osSubstituted?:number
    itemsIssued?:number
    fillRatePercent?:number
    billStart?:Date
    billEnd?:Date
    dispenseStart?:Date
    dispenseEnd?:Date
    unit:string
    user?:string
}

export interface Unit {
    id:string
    name:string
    department:string
}


export interface Inventory {
    Id:string,
    Code:string
    GenericDescription:string 
    BrandName:string,
    IsTracerItem:number,
    IsActive:number,
    IsAvailable:number
}

export interface OutOfStock {
    Date:string,
    Id:string,
    OrderCartegory:string,
    ReportedBy:string,
    Code:string,
    GenericDescription:string,
    GroupName:string,
    BrandName:string,
    IsFormularly:boolean,
    OsToDate:number
}