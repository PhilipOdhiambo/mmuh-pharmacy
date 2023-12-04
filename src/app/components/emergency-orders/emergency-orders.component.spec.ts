import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyOrdersComponent } from './emergency-orders.component';

describe('EmergencyOrdersComponent', () => {
  let component: EmergencyOrdersComponent;
  let fixture: ComponentFixture<EmergencyOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmergencyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
