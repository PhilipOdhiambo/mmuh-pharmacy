import { Component, OnInit} from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BincardPageComponent } from './pages/bincard-page/bincard-page.component';
import { AppService } from './app.service';
import { ModalComponent } from './components/modal/modal.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,
    HomePageComponent,
    BincardPageComponent,ModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'template-17';

  constructor(private dataService:AppService){}
  ngOnInit() {
    // this.dataService.fetchData().subscribe(res => console.log(res))
    // this.dataService.getNextTally("sheetName=outpatients", 'prescription').then(res => console.log(res))
    // this.dataService.getWorkload("prescription").then(res => console.log(res))
    // this.dataService.doGet("sheetName=inventory").subscribe(res => {
    //   this.dataService.setFirebaseDoc('inventory/inventory',{inventory: JSON.stringify(res)})
    // })
    this.dataService.$inventory.subscribe(res => console.log(res))

  }


}
