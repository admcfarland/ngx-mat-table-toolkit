import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MttClientPaginator } from './mtt-client-paginator';

describe('MttClientPaginator', () => {
  let component: MttClientPaginator<any>;
  let fixture: ComponentFixture<MttClientPaginator<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MttClientPaginator]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MttClientPaginator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
