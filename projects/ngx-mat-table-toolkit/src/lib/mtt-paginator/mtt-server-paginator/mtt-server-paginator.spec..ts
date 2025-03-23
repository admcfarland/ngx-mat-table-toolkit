import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttServerPaginatorComponent } from './mtt-server-paginator';

describe('MttServerPaginatorComponent', () => {
  let component: MttServerPaginatorComponent;
  let fixture: ComponentFixture<MttServerPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MttServerPaginatorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MttServerPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
