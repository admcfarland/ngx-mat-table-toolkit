import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttTextDisplayModal } from './mtt-text-display-modal';

describe('MttTextDisplayModal', () => {
  let component: MttTextDisplayModal;
  let fixture: ComponentFixture<MttTextDisplayModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MttTextDisplayModal]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MttTextDisplayModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
