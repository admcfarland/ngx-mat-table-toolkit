import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttTextDisplayModalComponent } from './mtt-text-display-modal';

describe('MttTextDisplayModalComponent', () => {
  let component: MttTextDisplayModalComponent;
  let fixture: ComponentFixture<MttTextDisplayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MttTextDisplayModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MttTextDisplayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
