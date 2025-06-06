import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MockDataService, MockModel, COMPOUND_FIELDS } from './mock-data.service';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SpanFillerComponent } from './shared/components/span-filler/span-filler.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MttTable } from '../../../projects/ngx-mat-table-toolkit/src/lib/mtt-table/mtt-table';
import { MttPaginatorModule } from '../../../projects/ngx-mat-table-toolkit/src/lib/mtt-paginator/mtt-paginator.module';
import { PathValuePipe } from '../../../projects/ngx-mat-table-toolkit/src/lib/mtt-table/pipes/path-value.pipe';
import { MttClientPaginator } from '../../../projects/ngx-mat-table-toolkit/src/lib/mtt-paginator/mtt-client-paginator/mtt-client-paginator';
import { MttServerPaginator } from '../../../projects/ngx-mat-table-toolkit/src/lib/mtt-paginator/mtt-server-paginator/mtt-server-paginator';
import { TableConfig } from '../../../projects/ngx-mat-table-toolkit/src/lib/mtt-table/models/table.model';
import { MttTableColumnService } from '../../../projects/ngx-mat-table-toolkit/src/lib/mtt-table/services/mtt-table-column.service';
import { Column } from '../../../projects/ngx-mat-table-toolkit/src/lib/mtt-table/models/column.model';

const AFREFRESH = 2000;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MttTable, AsyncPipe, MatDividerModule, MatSlideToggleModule, SpanFillerComponent,
    MatChipsModule, MatSelectModule, MatFormFieldModule, FormsModule, MttPaginatorModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [PathValuePipe],
})
export class AppComponent implements OnInit {
  @ViewChild('clientTable') clientTable!: MttTable<MockModel>;
  @ViewChild('serverTable') serverTable!: MttTable<MockModel>;
  @ViewChild(MttClientPaginator) clientPaginator!: MttClientPaginator<MockModel>;
  @ViewChild(MttServerPaginator) serverPaginator!: MttServerPaginator;

  // Table component configuation.
  tableConfig: TableConfig<MockModel> = {
    id: 'test-table',
    caption: 'User data table with actions.',
    columnsConfig: {
      columns: [
        {
          type: 'button',
          field: 'position',
          header: 'Position',
          align: 'center',
          label: (row: MockModel) => String(row.position),
          onClick: (row: MockModel) => console.log('Position:', row.position),
          visible: false,
        },
        {
          type: 'text',
          field: 'name',
          header: 'Name',
          sortable: true,
        },
        {
          type: 'text',
          field: 'weight',
          header: 'Weight',
          sortable: true,
          align: 'right',
        },
        {
          type: 'text',
          field: 'symbol',
          header: 'Symbol',
          sortable: true,
        },
        {
          type: 'text',
          field: 'discoveredBy',
          header: 'Discovered By',
          sortable: true,
        },
        {
          type: 'text',
          field: 'discoveryLocation',
          header: 'Discovery Location',
          valueGetter: (row: MockModel) => `${row.university} (${row.country})`,
          sortable: true,
          truncationLimit: 40,
        },
        {
          type: 'text',
          field: 'career',
          header: 'Career',
          sortable: true,
        },
        {
          type: 'checkbox',
          field: 'online',
          header: 'Online Graduate',
          checked(row: MockModel) {
            return row.online;
          },
          align: 'center',
        },
        {
          type: 'text',
          field: 'dob',
          header: 'Date of Birth',
          sortable: true,
        },
        {
          type: 'checkbox',
          field: 'married',
          header: 'Married',
          checked(row: MockModel) {
            return row.married;
          },
          align: 'center',
        },
        {
          type: 'text',
          field: 'company',
          header: 'Company',
          sortable: true,
        },
      ],
      stickyHeaders: true,
      showHideColumns: true,
      reorderColumns: true,

    },
    rowsConfig: {
      showRowNumbers: true,
      multiRowSelection: true,
      hover: true,
      zebraRows: true,
      rowClass: (row: MockModel) => (row.name === 'Calcium' ? ['gold', 'bold'] : ''),
    },
    sortOptions: {
      sortFunc(item, property): string | number {
        if (property === 'discoveryLocation') {
          return `${item.university} ${item.country}`;
        }
        const value = item[property as keyof MockModel];
        if (typeof value === 'boolean') {
          return Number(value);
        } else if (typeof value === 'object') {
          return JSON.stringify(value);
        }
        return value;
      },
    },
    selectedRowActions: [
      {
        label: 'Delete rows',
        description: 'Delete selected rows',
        action: (rows: MockModel[]) => rows?.forEach((row) => console.log('Deleting:', row)),
      },
      {
        label: 'Export rows',
        description: 'Export selected rows',
        action: () => console.log('Exporting selected rows'),
        disabled: (rows: MockModel[]) => rows?.some(row => row.career === 'Paleontologist'),
      },
    ],
    rowActions: {
      stickyActions: true,
      actions: [
        {
          label: 'Show details',
          description: 'Show more details',
          action: (row: MockModel) => console.log('Showing details:', row),
        },
      ],
    },
  };

  // Client table config
  clientConfig: TableConfig<MockModel> = {
    ...this.tableConfig,
    autoRefresh: {
      enabled: false,
      onChange: (enabled) => {
        this.toggleAutoRefresh(enabled);
      },
    },
    tableActions: [
      {
        label: 'Refresh table',
        description: 'Update table with latest data',
        action: () => {
          this.loadData();
          this.tableDataRequestClient();
        }
      },
    ],
    searchBarConfig: {
      label: 'Search client table',
      placeholder: 'Example: Hydrogen',
    },
  };

  // Server table config
  serverConfig: TableConfig<MockModel> = {
    ...this.tableConfig,
    tableActions: [
      {
        label: 'Refresh table',
        description: 'Update table with latest data',
        action: () => {
          // Author note: It would be considered a "best practice" to reset the paginator state of whether all items are known upon refresh.
          this.serverPaginator.totalItemsKnown = false;
          this.serverData$ = this.mockService.fetchData(this.sPageIndex, this.sPageSize).pipe(
            catchError(() => {
              return of([]); // Return an empty array in case of error
            }),
            finalize(() => {
              this.loading = false;
              this.detector.detectChanges();
            })
          );
        }
      },
    ],
    searchBarConfig: {
      label: 'Search server table',
      placeholder: 'Example: Hydrogen',
    },
  };

  // Table data.
  clientData!: MockModel[];
  filteredData!: MockModel[];
  paginatedData!: MockModel[];
  serverData$!: Observable<MockModel[]>;

  // Paginator vars.
  accessibleLabel = 'test paginator label';
  showFirstLast = true;

  // Client paging vars.
  cPageIndex = 0;
  cPageSize = 10;
  cPageSizeOptions = [10, 20, 40, 80, 100];
  // Client filter vars.
  clientSearchBarText = '';
  clientColumnFilters: Record<string, unknown> = {};
  clientSymbols: string[] = [];
  // Client sort var.
  clientSort = { active: '', direction: '' };

  // Server paging vars.
  sPageIndex = 0;
  sPageSize = 10;
  sPageSizeOptions = [5, 10, 20, 45, 100];
  // Server filter var.
  serverFilter = '';
  // Server sort var.
  serverSort = { active: '', direction: '' };

  // Loading spinner var.
  loading!: boolean;

  // Auto-refresh vars.
  _refreshIntervalId!: ReturnType<typeof setTimeout>;;

  // Example toggle var.
  toggleExample: 'client' | 'server' = 'server';

  constructor(
    private mockService: MockDataService,
    private detector: ChangeDetectorRef,
    private flattenService: MttTableColumnService,
    private pvp: PathValuePipe,
  ) {
    this.loading = true;
    // Mock server data retrieval wait.
    setTimeout(() => {
      this.serverData$ = this.mockService.fetchData(this.sPageIndex, this.sPageSize).pipe(
        catchError(() => {
          return of([]); // Return an empty array in case of error
        }),
        finalize(() => {
          this.loading = false;
          detector.detectChanges();
        })
      );
    }, this._getRandomNumber(1000, 2500));
  }

  ngOnInit(): void {
    // Client side pagination start.
    this.loadData();
  }

  loadData(): void {
    // Client side pagination test.
    this.clientData = this.mockService.fetchAll();

    const determineColumnType = (_key: string, value: any, path: string): Column<any> => {
      if (typeof value === 'boolean') {
        return {
          type: 'slideToggle',
          field: path,
          header: this._getFlattenedHeader(path),
          sortable: false,
          align: 'center',
          visible: true,
          checked: (row: any) => this.pvp.transform<typeof row, boolean>(row, path) ?? false,
        };
      }
      return {
        type: 'text',
        field: path,
        header: this._getFlattenedHeader(path),
        sortable: true,
        visible: true,
      };
    };
    // Flatten certain objects in the data to get column properties and merge with existing columns.
    this.tableConfig.columnsConfig.columns = this.flattenService.flattenAndMergeColumns(
      this.clientData[0].preferences,
      determineColumnType,
      this.flattenService.flattenAndMergeColumns(
        this.clientData[0].address,
        determineColumnType,
        this.tableConfig.columnsConfig.columns,
        'address'
      ),
      'preferences'
    );

    this.filteredData = [...this.clientData];
    this.clientSymbols = Array.from(new Set(this.clientData.map((data: MockModel) => data.symbol))).sort();
    this.detector.detectChanges();
  }

  updateDataClient(newData: MockModel[]): void {
    this.paginatedData = [...newData];
    if (this.clientPaginator) {
      // Interesting reassignment with destructuring ..
      ({ pageIndex: this.cPageIndex, pageSize: this.cPageSize } = this.clientPaginator.getPagination());
    }
    this.detector.detectChanges();
  }

  updateDataServer(): void {
    this.loading = true;
    ({ pageIndex: this.sPageIndex, pageSize: this.sPageSize } = this.serverPaginator.getPagination());

    setTimeout(() => {
      this.serverData$ = this.mockService.fetchData(this.sPageIndex, this.sPageSize).pipe(
        map(data => {
          if (data.length < this.sPageSize) {
            const count = (this.sPageIndex * this.sPageSize) + data.length;
            this.serverPaginator.totalItems = count;
          }
          return data;
        }),
        catchError(() => {
          return of([]); // Return an empty array in case of error
        }),
        finalize(() => {
          this.loading = false;
          this.detector.detectChanges();
        })
      );
    }, this._getRandomNumber(275, 1000));
  }

  tableDataRequestClient(): void {
    let filteredData = [...this.clientData];

    // Store filtering and sorting options.
    const searchBarText = this.clientSearchBarText;
    const columnFilters = this.clientColumnFilters;
    const sortBy = this.clientSort.active;
    const sortDirection = this.clientSort.direction;

    // Apply global filter, if provided
    if (searchBarText) {
      const searchTerm = searchBarText.toLowerCase();
      filteredData = filteredData.filter((item) =>
        Object.values(item).some((value) =>
          value !== null &&
          value !== undefined &&
          value.toString().toLowerCase().includes(searchTerm)
        )
      );
    }

    if (columnFilters) {
      Object.keys(columnFilters).forEach((key) => {
        const filterValue = columnFilters[key];
        filteredData = filteredData.filter((item) => {
          // Get nested value
          const itemValue = this.pvp.transform(item, key);

          // Handle multiple values filtering (e.g., "name": ["Aluminum", "Beryllium"])
          if (Array.isArray(filterValue)) {
            return filterValue.includes(itemValue);
          }

          // Handle string matching (case-insensitive)
          if (typeof itemValue === 'string') {
            return itemValue.toLowerCase().includes(String(filterValue).toLowerCase());
          }

          // Handle direct equality checks for booleans and numbers
          return itemValue === filterValue;
        });
      });
    }

    // Sort if sortBy is provided
    if (sortBy) {
      const direction = sortDirection === 'desc' ? -1 : sortDirection === 'asc' ? 1 : 0;
      filteredData.sort((a, b) => {
        let aValue, bValue;

        // Check if `sortBy` is a compound field
        if (COMPOUND_FIELDS[sortBy]) {
          // Extract the config for the compound field
          const { properties, combiner } = COMPOUND_FIELDS[sortBy];
          // Combine the properties for comparison
          aValue = combiner(...properties.map(prop => a[prop]));
          bValue = combiner(...properties.map(prop => b[prop]));
        } else {
          // Handle single property sorting
          aValue = this.pvp.transform(a, sortBy);
          bValue = this.pvp.transform(b, sortBy);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return (aValue - bValue) * direction;
        } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
          return (Number(aValue) - Number(bValue)) * direction;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue) * direction;
        }
        return 0;
      });
    }

    this.filteredData = [...filteredData];

    // If user was beyond current allowable page range, move them to the last available page.
    const lastPage = Math.ceil(this.filteredData.length / this.clientPaginator.pageSize);
    const validatedPage = Math.min(this.clientPaginator.pageIndex, lastPage - 1);
    this.clientPaginator.pageIndex = validatedPage;
  }

  tableDataRequestServer(): void {

    this.loading = true;
    // Reset if paginator knows the data limit.
    this.serverPaginator.totalItemsKnown = false;
    const searchBarText = this.serverFilter;
    const sortBy = this.serverSort.active;
    const sortDirection = this.serverSort.direction;


    setTimeout(() => {
      this.serverData$ = this.mockService.fetchData(this.sPageIndex, this.sPageSize, sortBy, sortDirection, searchBarText).pipe(
        map(data => {
          if (data.length < this.sPageSize) {
            const count = (this.sPageIndex * this.sPageSize) + data.length;
            this.serverPaginator.totalItems = count;
          }
          return data;
        }),
        catchError(() => {
          return of([]); // Return an empty array in case of error
        }),
        finalize(() => {
          this.loading = false;
          this.detector.detectChanges();
        })
      );
    }, this._getRandomNumber(275, 1000));
  }

  toggleAutoRefresh(enabled: boolean): void {
    if (enabled) {
      this.stopAF();
    } else {
      this.startAF();
    }
  }

  startAF(): void {
    this._refreshIntervalId = setInterval(() => {
      this.loadData();
      this.tableDataRequestClient();
    }, AFREFRESH);
  }

  stopAF(): void {
    clearInterval(this._refreshIntervalId);
  }

  clientFilterChanged(updatedFilter: string): void {
    this.clientSearchBarText = updatedFilter;
    this.tableDataRequestClient();
  }

  clientSortChanged(updatedSort: { active: string; direction: string }): void {
    this.clientSort = updatedSort;
    this.tableDataRequestClient();
  }

  serverFilterChanged(updatedFilter: string): void {
    this.serverFilter = updatedFilter;
    this.tableDataRequestServer();
  }

  serverSortChanged(updatedSort: { active: string; direction: string }): void {
    this.serverSort = updatedSort;
    this.tableDataRequestServer();
  }

  onToggleChange(checked: boolean): void {
    this.toggleExample = checked ? 'server' : 'client';
  }

  onChipChange(changes: { field: string; value: string }[]): void {
    this.clientColumnFilters = {};
    changes.forEach(change => this.clientColumnFilters[change.field] = change.value);
    this.tableDataRequestClient();
  }

  onSelectChange(value: MatSelectChange): void {
    this.clientColumnFilters['symbol'] = value;
    if (!this.clientColumnFilters['symbol']) {
      delete this.clientColumnFilters['symbol'];
    }
    this.tableDataRequestClient();
  }

  _getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _getFlattenedHeader(path: string): string {
    const parts = path.split('.').map<string>(str => str.charAt(0).toUpperCase() + str.slice(1));
    if (parts.length === 1) {
      return parts[0];
    }

    const prefix = parts.slice(0, parts.length - 1).join(' ');
    const field = parts[parts.length - 1];
    return `[${prefix}] ${field}`;
  }
}
