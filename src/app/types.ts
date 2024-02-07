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
    Code:string
    GenericDescription:string
    BrandName:string
}