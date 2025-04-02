import { TestBed } from '@angular/core/testing';

import { MttRowSelectionService } from './mtt-row-selection.service';

describe('MttRowSelectionService', () => {
  let service: MttRowSelectionService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MttRowSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should select a row and emit selection changes', () => {
    const row = { id: 1, name: 'Test Row' };
    const pageIndex = 0;

    const spy = jasmine.createSpy('selectionChangeSpy');
    service.selectionChanges.subscribe(spy);

    service.selectRow(row, pageIndex);

    expect(service.getSelectedRows()).toContain(row);
    expect(spy).toHaveBeenCalledWith([row]);
  });

  it('should deselect a row and emit selection changes', () => {
    const row = { id: 1, name: 'Test Row' };
    const pageIndex = 0;

    service.selectRow(row, pageIndex);

    const spy = jasmine.createSpy('selectionChangeSpy');
    service.selectionChanges.subscribe(spy);

    service.deselectRow(row, pageIndex);

    expect(service.getSelectedRows()).not.toContain(row);
    expect(spy).toHaveBeenCalledWith([]);
  });

  it('should check if a row is selected', () => {
    const row = { id: 1, name: 'Test Row' };
    const pageIndex = 0;

    service.selectRow(row, pageIndex);

    expect(service.isSelected(row, pageIndex)).toBeTrue();
    expect(service.isSelected({ id: 2, name: 'Another Row' }, pageIndex)).toBeFalse();
  });

  it('should clear all selected rows and emit selection changes', () => {
    const row1 = { id: 1, name: 'Row 1' };
    const row2 = { id: 2, name: 'Row 2' };
    const pageIndex = 0;

    service.selectRow(row1, pageIndex);
    service.selectRow(row2, pageIndex);

    const spy = jasmine.createSpy('selectionChangeSpy');
    service.selectionChanges.subscribe(spy);

    service.clearSelection();

    expect(service.getSelectedRows()).toEqual([]);
    expect(spy).toHaveBeenCalledWith([]);
  });

  it('should handle multiple pages of selected rows', () => {
    const row1 = { id: 1, name: 'Row 1' };
    const row2 = { id: 2, name: 'Row 2' };
    const pageIndex1 = 0;
    const pageIndex2 = 1;

    service.selectRow(row1, pageIndex1);
    service.selectRow(row2, pageIndex2);

    expect(service.getSelectedRows()).toContain(row1);
    expect(service.getSelectedRows()).toContain(row2);

    service.deselectRow(row1, pageIndex1);

    expect(service.getSelectedRows()).not.toContain(row1);
    expect(service.getSelectedRows()).toContain(row2);
  });
});
