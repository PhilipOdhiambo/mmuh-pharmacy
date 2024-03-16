import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BincardPageComponent } from './pages/bincard-page/bincard-page.component';
import { ModalComponent } from './components/modal/modal.component';

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
    constructor() { }
  ngOnInit() {
  
  }


}
