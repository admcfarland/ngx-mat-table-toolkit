import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncatedTextDetailsComponent } from './truncated-text-details.component';

describe('TruncatedTextDetailsComponent', () => {
  let component: TruncatedTextDetailsComponent;
  let fixture: ComponentFixture<TruncatedTextDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruncatedTextDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruncatedTextDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
