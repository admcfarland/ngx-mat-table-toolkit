import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttModifyColumns } from './mtt-modify-columns';

describe('ModifyColumnsComponent', () => {
  let component: MttModifyColumns;
  let fixture: ComponentFixture<MttModifyColumns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MttModifyColumns]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MttModifyColumns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
