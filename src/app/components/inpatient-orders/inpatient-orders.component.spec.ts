import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpatientOrdersComponent } from './inpatient-orders.component';

describe('InpatientOrdersComponent', () => {
  let component: InpatientOrdersComponent;
  let fixture: ComponentFixture<InpatientOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InpatientOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InpatientOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
