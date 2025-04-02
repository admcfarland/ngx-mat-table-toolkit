import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttServerPaginator } from './mtt-server-paginator';

describe('MttServerPaginator', () => {
  let component: MttServerPaginator;
  let fixture: ComponentFixture<MttServerPaginator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MttServerPaginator]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MttServerPaginator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
