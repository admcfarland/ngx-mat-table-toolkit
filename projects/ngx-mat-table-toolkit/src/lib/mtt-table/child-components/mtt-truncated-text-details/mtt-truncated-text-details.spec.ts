import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttTruncatedTextDetailsComponent } from './mtt-truncated-text-details';

describe('TruncatedTextDetailsComponent', () => {
  let component: MttTruncatedTextDetailsComponent;
  let fixture: ComponentFixture<MttTruncatedTextDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MttTruncatedTextDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MttTruncatedTextDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
