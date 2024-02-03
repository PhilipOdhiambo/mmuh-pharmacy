 export interface WorkloadTransaction {
    id:string | null
    Date:Date 
    Cartegory?:string 
    tallyNo?: string
    noOfDocs?:number
    itemsOrdered?:number
    itemsAvailable?:number
    itemsSubstituted?:number
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