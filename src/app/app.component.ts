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
 

  }


}
