import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Sort } from '@angular/material/sort';
import { MttTable } from './mtt-table';

describe('MttTable', () => {
  let component: MttTable<any>;
  let fixture: ComponentFixture<MttTable<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MttTable]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MttTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should emit filterChange when onFilterChange is called', () => {
  //   const filterString = 'test filter';
  //   spyOn(component.filterChange, 'emit');

  //   component.onFilterChange(filterString);

  //   expect(component.filterChange.emit).toHaveBeenCalledWith(filterString);
  // });

  // it('should emit sortChange and announce sorting when onSortChange is called', () => {
  //   const sortEvent: Sort = { active: 'name', direction: 'asc' };
  //   spyOn(component.sortChange, 'emit');
  //   spyOn(component['announcer'], 'announce');

  //   component.onSortChange(sortEvent);

  //   expect(component.sortChange.emit).toHaveBeenCalledWith(sortEvent);
  //   expect(component['announcer'].announce).toHaveBeenCalledWith('Sorting by name ascending');
  // });

  // it('should toggle row selection when toggleRowSelection is called', () => {
  //   const row = { id: 1, name: 'Test Row' };
  //   spyOn(component['rss'], 'selectRow');
  //   spyOn(component['rss'], 'deselectRow');

  //   component.toggleRowSelection(true, row);
  //   expect(component['rss'].selectRow).toHaveBeenCalledWith(row, component.pageIndex);

  //   component.toggleRowSelection(false, row);
  //   expect(component['rss'].deselectRow).toHaveBeenCalledWith(row, component.pageIndex);
  // });

  // it('should check if a row is selected when isSelected is called', () => {
  //   const row = { id: 1, name: 'Test Row' };
  //   spyOn(component['rss'], 'isSelected').and.returnValue(true);

  //   const result = component.isSelected(row);

  //   expect(result).toBeTrue();
  //   expect(component['rss'].isSelected).toHaveBeenCalledWith(row, component.pageIndex);
  // });

  // it('should toggle all row selections when toggleAllSelection is called', () => {
  //   const rows = [{ id: 1 }, { id: 2 }];
  //   component.data = rows;
  //   spyOn(component['rss'], 'selectRow');
  //   spyOn(component['rss'], 'deselectRow');

  //   component.toggleAllSelection(true);
  //   rows.forEach(row => {
  //     expect(component['rss'].selectRow).toHaveBeenCalledWith(row, component.pageIndex);
  //   });

  //   component.toggleAllSelection(false);
  //   rows.forEach(row => {
  //     expect(component['rss'].deselectRow).toHaveBeenCalledWith(row, component.pageIndex);
  //   });
  // });

  // it('should check if all rows are selected when allSelected is called', () => {
  //   const rows = [{ id: 1 }, { id: 2 }];
  //   component.data = rows;
  //   spyOn(component['rss'], 'isSelected').and.returnValues(true, true);

  //   const result = component.allSelected();

  //   expect(result).toBeTrue();
  //   rows.forEach(row => {
  //     expect(component['rss'].isSelected).toHaveBeenCalledWith(row, component.pageIndex);
  //   });
  // });

  // it('should check if some rows are selected when someSelected is called', () => {
  //   const rows = [{ id: 1 }, { id: 2 }];
  //   component.data = rows;
  //   spyOn(component['rss'], 'isSelected').and.returnValues(true, false);

  //   const result = component.someSelected();

  //   expect(result).toBeTrue();
  //   rows.forEach(row => {
  //     expect(component['rss'].isSelected).toHaveBeenCalledWith(row, component.pageIndex);
  //   });
  // });

  // it('should return selected rows when getSelectedRows is called', () => {
  //   const selectedRows = [{ id: 1 }, { id: 2 }];
  //   spyOn(component['rss'], 'getSelectedRows').and.returnValue(selectedRows);

  //   const result = component.getSelectedRows();

  //   expect(result).toEqual(selectedRows);
  //   expect(component['rss'].getSelectedRows).toHaveBeenCalled();
  // });

  // it('should deselect all rows when deselectAllRows is called', () => {
  //   spyOn(component['rss'], 'clearSelection');

  //   component.deselectAllRows();

  //   expect(component['rss'].clearSelection).toHaveBeenCalled();
  // });

  // it('should update floatState on focus and blur events', () => {
  //   component.searchControl.setValue('');
  //   component.onFocusIn();
  //   expect(component.floatState).toBe('float');

  //   component.onBlur();
  //   expect(component.floatState).toBe('placeholding');

  //   component.searchControl.setValue('test');
  //   component.onBlur();
  //   expect(component.floatState).toBe('float');
  // });
});
