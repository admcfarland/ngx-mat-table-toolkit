import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MttTableComponent } from './mtt-table';

describe('MttTableComponent', () => {
  let component: MttTableComponent<any>;
  let fixture: ComponentFixture<MttTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MttTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MttTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
