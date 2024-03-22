import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';
import { Inventory, WorkloadTransaction } from '../../types';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-prescriptions-new',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  styles: `
  `,
  template: `
  <div>
    <div class="modal-dialog">
    <form class="modal-content" action="" method="post">
        <div class="modal-header">
            <h5 class="modal-title" id="addNewModalLabel">Add new</h5>
            <button type="button" class="btn-close" (click)="close()" aria-label="Close"></button>
        </div>
        <div class="modal-body">   

                <div class="mb-3 d-inline-flex align-items-center">
                    <label class="mx-2 form-label" for="no-of-docs">No. of Doc(s)</label>
                    <input [(ngModel)]="numberOfDocs" class="form-control" required min="1" style="width: 150px;" type="number"
                        name="number-of-docs" id="number-of-docs" onclick="this.select()">
                    <div class="invalid-feedback">This field is required</div>
                </div> <!-- Number of docs -->

                <div class="mb-3 d-inline-flex align-items-center">
                    <label class="mx-2 form-label" for="no-of-items">No. of Item(s) Ordered</label>
                    <input [(ngModel)]="itemsOrdered" class="form-control" required min="1" style="width: 150px;" type="number"
                        name="number-of-items" id="number-of-items" onclick="this.select()">
                    <div class="invalid-feedback">This field is required</div>
                </div> <!-- Number of items ordered -->

                <p class="mb-3">Add out of stock item(s) below and indicate is subsitituted: </p>
        
                <table class="table table-striped bg-light">
                    <tr>
                        <th>#</th>
                        <th>Generic Description</th>
                        <th>BrandName</th>
                        <th>Subsitituted</th>
                        <th></th>
                    </tr>
                    @for (os of osList; track $index) {
                        
                        <tr>
                            <td>{{$index + 1}}</td>
                            <td class="text-wrap" style="width: 300px;">{{os.GenericDescription}}</td>
                            <td>{{os.BrandName ? os.BrandName : "Generic"}}</td>
                            <td><input type="checkbox" (change)="updateSubstitute($event)" name="" id=""></td>
                            <td><i title="Remove Row" role="banner" (click)="osList.splice($index,1)" id="deleteOs" class="bi bi-trash"></i></td>
                        </tr>
                    }
        
        
                </table> <!-- table of out of stock -->        
                <div class="dropdown">
                            <!-- Dropdown filter/ Search-->
                    <input id="searchbox"  class="dropdown-toggle form-control"  data-bs-toggle="dropdown"
                        autocomplete="false" placeholder="search and select os item(s)"
                        (input)="filterInventory()"
                        >
                    
                        <ul class="dropdown-menu" style="width:100%;height: 300px;overflow:auto;" aria-expanded="false">
                            @for (item of filteredInventory; track $index) {

                                <li class="dropdown-item " role="button" (click)="onInventoryDropdownClick(item)">
                                    <a>
                                        <span class="text-wrap" >{{item.Code + ' ' + item.GenericDescription}}</span> 
                                        <span >{{item.BrandName ? " " + item.BrandName : ""}}</span> 
                                    </a>
                                </li>                                                 
                            }                
                        
                            @if (invetoryFetching) {        
                                <li>Loading ...</li>
                            }
                    </ul><!-- Dropdown Menu -->
                </div><!--Dropdown-->           
            
        </div>
        <div class="modal-footer">
            @if (!saving) {
                <button type="button" (click)="save($event)" class="btn btn-primary">Save New</button>
            }
            @else {
                <button class="btn btn-primary" disabled="disabled">Saving ...</button>
            }
        </div>
    </form>
    </div>
    <div class="app-modal-backdrop"></div>
  </div>
  `
})
export class PrescriptionsNewComponent implements OnInit {
  osList: Inventory[] = []
  @Input() cartegory!: string
  @Input() tallyPrefix!: string
  billStart = new Date()
  billEnd: any
  dispenseStart: any
  dispenseEnd: any
  user: any
  tallyNo: any
  itemsOrdered: any
  itemsSubstituted = 0
  numberOfDocs?: number
  saving = false;
  $inventorySubscription!: Subscription
  inventory: Inventory[] = []
  filteredInventory: Inventory[] = []
  invetoryFetching = true;

  searchInput!: HTMLInputElement

  @ViewChild('osDialog', { static: true }) osDialog!: ElementRef

  @Output() onModalClose = new EventEmitter()

  constructor(private appService: AppService, private el: ElementRef) {
    this.fetchInventory();
  }
  ngOnInit(): void {
    this.searchInput = document.getElementById("searchbox") as HTMLInputElement
  }

  fetchInventory() {
    this.invetoryFetching = true;
    this.appService.$inventory.subscribe(res => {
      this.inventory = res
      this.filteredInventory = res
      this.invetoryFetching = false
    })
  }

  filterInventory() {
    const search = this.searchInput.value
    this.filteredInventory = this.inventory.filter(item => {
      const regex = new RegExp('^' + search + '| ' + search + '|\\(' + search, 'i')
      if (regex.test(item.Code) || regex.test(item.BrandName) || regex.test(item.GenericDescription)) {
        return true
      }
      return false
    })
  }

  updateSubstitute(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.itemsSubstituted += 1
    } else {
      this.itemsSubstituted -= 1
    }

  }

  async save(event: Event) {
    this.saving = true
    const utils = await this.appService.getUtils()
    const nextTally = this.tallyPrefix + await this.appService.getNextTally('sheetName=outpatients', this.cartegory)
    let itemsIssued = this.itemsOrdered - this.osList.length + this.itemsSubstituted
    let fillRatePercent = (itemsIssued / this.itemsOrdered) * 100;
    const data: WorkloadTransaction[] = [
      {
        id: utils.id,
        Date: utils.timestamp,
        Cartegory: this.cartegory,
        tallyNo: nextTally,
        noOfDocs: this.numberOfDocs,
        itemsOrdered: this.itemsOrdered,
        itemsOs: this.osList.length || 0,
        osSubstituted: this.itemsSubstituted,
        itemsIssued,
        fillRatePercent,
        billStart: this.billStart,
      }
    ]
    await this.appService.doPost('outpatients', 'create', data)
    this.saving = false
    this.onModalClose.emit()

  }

  onSearchClick() {
    this.osDialog.nativeElement.show()
  }

  onInventoryDropdownClick(item: Inventory) {
    this.osList.push(item)
    this.searchInput.value = ''
  }


  close() {
    this.onModalClose.emit(true)
  }



}
