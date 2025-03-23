import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttClientPaginatorComponent } from './mtt-client-paginator';

describe('MttClientPaginatorComponent', () => {
  let component: MttClientPaginatorComponent;
  let fixture: ComponentFixture<MttClientPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MttClientPaginatorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MttClientPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
