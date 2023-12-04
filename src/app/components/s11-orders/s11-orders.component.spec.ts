import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S11OrdersComponent } from './s11-orders.component';

describe('S11OrdersComponent', () => {
  let component: S11OrdersComponent;
  let fixture: ComponentFixture<S11OrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [S11OrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(S11OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
