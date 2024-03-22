import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BincardPageComponent } from './pages/bincard-page/bincard-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { PrescriptionService } from './services/prescription.service';
import { PrescriptionI } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,
    HomePageComponent,
    BincardPageComponent, ModalComponent,
  ],
  template: `
  <nav class="container">
    <h3 class="bg-primary text-white text-center">MMUH PharmaTool</h3>
    <div class="d-flex"> <!-- Nav Bar -->
    <div class="flex-grow-1"> <!-- Nav links-->
      <ul class="list list-unstyled d-flex align-items-center gap-2 ">
        <li>
          <a class="btn" href="">Workload Tracking</a>
        </li>
        <li>
          <a class="btn" href="/bincard">Inventory Tracking</a>
        </li>
      </ul>
    </div>
    <div> <!-- User div -->
        <select class="form-control" name="" id="user">
            <option selected disabled value="">...Select User...</option>
            <option  value="Philip">Philip</option>
            <option  value="Judy">Judy</option>
            <option  value="Lambert">Lambert</option>
            <option  value="Cliff">Cliff</option>
            <option value="Betty">Betty</option>
        </select>
    </div>
    </div>
  </nav>

  <router-outlet></router-outlet>
  `,
  styles: `

  `
})
export class AppComponent implements OnInit {
  prescriptionService = inject(PrescriptionService)
  constructor() {
    // this.prescriptionService.fetchOne("2024-02-03T13:38:12.851Z").subscribe(res=> console.log(res))
    // this.prescriptionService.create({Date: new Date().toISOString()} as PrescriptionI)
    this.prescriptionService.deleteOne("2024-03-22T07:39:47.231Z").then(res=>res)
    this.prescriptionService.prescriptions.subscribe(res => console.log(res))
  }
  ngOnInit() {

  }


}
