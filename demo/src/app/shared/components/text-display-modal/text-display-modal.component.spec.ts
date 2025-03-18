import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDisplayModalComponent } from './text-display-modal.component';

describe('TextDisplayModalComponent', () => {
  let component: TextDisplayModalComponent;
  let fixture: ComponentFixture<TextDisplayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextDisplayModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextDisplayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
