import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpatientOrdersComponent } from './outpatient-orders.component';

describe('OutpatientOrdersComponent', () => {
  let component: OutpatientOrdersComponent;
  let fixture: ComponentFixture<OutpatientOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutpatientOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutpatientOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
