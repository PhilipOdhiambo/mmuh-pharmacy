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

export interface Inventory {
    Id:string,
    Code:string
    GenericDescription:string 
    BrandName:string,
    IsTracerItem:boolean
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