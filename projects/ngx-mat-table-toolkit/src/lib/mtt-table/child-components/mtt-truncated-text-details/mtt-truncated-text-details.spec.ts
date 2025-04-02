import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttTruncatedTextDetails } from './mtt-truncated-text-details';

describe('TruncatedTextDetailsComponent', () => {
  let component: MttTruncatedTextDetails;
  let fixture: ComponentFixture<MttTruncatedTextDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MttTruncatedTextDetails]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MttTruncatedTextDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
