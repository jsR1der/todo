import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedListComponent } from './detailed-list.component';

describe('DetailedListComponent', () => {
  let component: DetailedListComponent;
  let fixture: ComponentFixture<DetailedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
