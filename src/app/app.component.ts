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
  template:`
  <h3 class="bg-primary text-white text-center">MMUH PharmaTool</h3>
  <nav>
    <ul>
      <li>
        <a href="">Workload Management</a>
      </li>
      <li>
        <a href="/bincard">Invetory Tracking</a>
      </li>
    </ul>
    <div class="float-end">
    <label for="user">User: </label>
        <select name="" id="user">
            <option selected disabled value="">..Select..</option>
            <option  value="Philip">Philip</option>
            <option  value="Judy">Judy</option>
            <option  value="Lambert">Lambert</option>
            <option  value="Cliff">Cliff</option>
            <option value="Betty">Betty</option>
        </select>
    </div>
  </nav>
  <router-outlet></router-outlet>
  `,
  styles:`
  h1 {color:yellow;}
  `
})
export class AppComponent implements OnInit {
  title = 'template-17';

  constructor(private dataService:AppService){}
  ngOnInit() {
 

  }


}
