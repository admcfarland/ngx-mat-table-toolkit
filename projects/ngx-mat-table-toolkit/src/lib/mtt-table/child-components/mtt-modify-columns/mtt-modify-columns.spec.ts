import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttModifyColumnsComponent } from './mtt-modify-columns';

describe('ModifyColumnsComponent', () => {
  let component: MttModifyColumnsComponent;
  let fixture: ComponentFixture<MttModifyColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MttModifyColumnsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MttModifyColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
