# Angular Ngx-Mat-Table-Toolkit

[![npm version](https://img.shields.io/npm/v/ngx-mat-table-toolkit.svg)](https://www.npmjs.com/package/ngx-mat-table-toolkit)
[![License](https://img.shields.io/github/license/admcfarland/ngx-mat-table-toolkit)](LICENSE)

A lightweight and modular Angular library for easing the creation of Material table components. Designed to extend Angular with table APIs, services and pipes for robust data visualization plus paginators for client and server side cases.

---

## 📦 Installation

```sh
npm install ngx-mat-table-toolkit
```

or with Yarn:

```sh
yarn add ngx-mat-table-toolkit
```

---

## 🚀 Usage

### 1️⃣ Import the Module
Modify your `app.module.ts` or a feature module:

```ts
import { NgModule } from '@angular/core';
import { MttTable } from 'ngx-mat-table-toolkit';

@NgModule({
  imports: [MttTable],
})
export class AppModule {}
```

### 2️⃣ Basic Example

```html
<mtt-table [tableConfig]="config"></mtt-table>
```

```ts
import { MttTable, TableConfig } from 'ngx-mat-table-toolkit';

interface FooBar {
  foo: string;
  bar: string;
}

export class YourComponent {
  // Table configuration.
  config: TableConfig<FooBar> = {
    id: 'foo-bar-table',
    caption: 'Table caption for accessibility.',
    columnsConfig: {
      columns: [
        {
          type: 'text',
          field: 'foo',
          header: 'Foo',
          sortable: true,
        },
        {
          type: 'text',
          field: 'bar',
          header: 'Bar',
          sortable: true,
        },
      ],
      stickyHeaders: true,
      reorderColumns: true,
    },
    rowsConfig: {
      showRowNumbers: true,
      multiRowSelection: true,
      hover: true,
      zebraRows: true,
      rowClass: (row: FooBar) => (row.foo === 'SpecialFoo' ? 'highlight' : ''),
    },
    searchBarConfig: {
      label: 'Search foo bar table',
      placeholder: 'Example: First Name',
    },
  }
}
```

### 🍽️ Kitchen Sink Example
See [GitHub Pages](https://admcfarland.github.io/ngx-mat-table-toolkit/) for repository.

---

## 🎯 Features

- ✅ Table component with configurations for columns, row actions, multiple row selection, etc
- ✅ Client and server side paginators
- ✅ Services to assist with flattening nested data structures into columns for the table component
- ✅ A pipe to traverse nested data structures to return column values
- ✅ Fully compatible with Angular 17
- ✅ Batteries included: The repository contains a demo application that can help you integrate the library with your project

---

## 🧰 APIs

### Table

#### TableConfig<T> Interface

The `TableConfig<T>` interface defines the configuration options for a table component.

| Property              | Type                          | Description                                                                                     | Default Value |
|-----------------------|-------------------------------|-------------------------------------------------------------------------------------------------|---------------|
| `id`                  | `string`                     | Unique identifier for the table element.                                                       | N/A           |
| `caption`             | `string`                     | Accessibility caption describing the table.                                                    | N/A           |
| `columnsConfig`       | `ColumnsConfig`              | Configuration for table columns.                                                               | N/A           |
| `rowsConfig?`         | `RowsConfig<T>`              | Configuration for table rows.                                                                  | `undefined`   |
| `autoRefresh?`        | `AutoRefreshConfig`          | Configuration for automatically refreshing table data.                                         | `undefined`   |
| `sortOptions?`        | `SortConfig<T>`              | Configuration for table sorting options.                                                       | `undefined`   |
| `tableActions?`       | `TableAction[]`              | List of actions that can be performed on the table.                                            | `undefined`   |
| `selectedRowActions?` | `SelectedRowAction<T>[]`     | List of actions applicable to multiple selected rows.                                          | `undefined`   |
| `rowActions?`         | `RowActionsConfig`           | Configuration for actions available on individual rows.                                        | `undefined`   |
| `searchBarConfig?`    | `SearchBarConfig`            | Configuration for the search bar.                                                              | `undefined`   |

#### TableAction Interface

The `TableAction` interface defines an action that can be performed on the entire table.

| Property     | Type                     | Description                                                                                     | Default Value |
|--------------|--------------------------|-------------------------------------------------------------------------------------------------|---------------|
| `label`      | `string`                 | The label displayed for the action button.                                                     | N/A           |
| `description?`| `string`      | An optional description providing more details about the action.                                | `undefined`   |
| `action`     | `() => void`             | Function executed when the action is triggered.                                                | N/A           |
| `disabled?`  | `() => boolean` | Function that determines if the action should be disabled.                                      | `undefined`   |

### Columns

#### ColumnsConfig Interface

The `ColumnsConfig` interface defines the configuration settings for table columns.

| Property         | Type               | Description                                                                                     | Default Value |
|------------------|--------------------|-------------------------------------------------------------------------------------------------|---------------|
| `columns`        | `Column<any>[]`    | Array of column configurations.                                                                 | N/A           |
| `stickyHeaders?`  | `boolean`          | Enables sticky column headers. If `true`, column headers remain fixed at the top while scrolling. | `false`       |
| `showHideColumns?`| `boolean`          | Allows users to toggle column visibility. If `true`, columns can be shown or hidden dynamically. | `false`       |
| `reorderColumns?` | `boolean`          | Enables column reordering. If `true`, users can change the order of columns.                    | `false`       |

#### Column<T> Type

The `Column<T>` type defines the configuration for a column in the table. It is a union type which supports multiple column types: text (`TextColumn<T>`), button (`ButtonColumn<T>`), checkbox (`CheckboxColumn<T>`), and slide toggle (`SlideToggleColumn<T>`).

| Property       | Type                          | Description                                                                                     | Default Value |
|----------------|-------------------------------|-------------------------------------------------------------------------------------------------|---------------|
| `type`         | `'text' \| 'button' \| 'checkbox' \| 'slideToggle'` | Identifies the type of the column.                                                              | N/A           |
| `field`        | `string`                        | Specifies the data field associated with this column.                                           | N/A           |
| `header`       | `string`                        | The header text displayed for the column.                                                      | N/A           |
| `align?`       | `'left' \| 'center'\| 'right'`   | Defines the text alignment for column content.                                                  | `'left'`      |
| `visible?`     | `boolean`                       | Controls column visibility. If `false`, the column is hidden.                                   | `true`        |
| `sortable?`    | `boolean`                       | Enables sorting for the column.                                                                | `false`       |
| `cellClass?`   | `(row: T) => string \| string[]` | A function to dynamically assign CSS classes to cells based on their data.                      | `undefined`   |
| `valueGetter?`       | `(row: T) => any`         | A function to customize how cell content is displayed.                      | `undefined`   |
| `filterOptions?`       | `ColumnFilter<T>`         | A configuration to define filtering options for a column.                      | `undefined`   |
| `truncationLimit?` (`TextColumn<T>`) | `number`       | Specifies the maximum number of characters to display in the cell. Content beyond this limit may be truncated. | `undefined`   |
| `label` (`ButtonColumn<T>`) | `(row: T) => string`    | Defines the button label, for accesible purposes, for a button column.                                                  | N/A           |
| `onClick` (`ButtonColumn<T>`) | `(row: T) => void`    | Handles button click events for a button column.                                               | N/A           |
| `checked` (`CheckboxColumn<T>`, `SlideToggleColumn<T>`)    | `(row: T) => boolean` | Determines whether the checkbox or slide toggle is checked.                                     | N/A           |

#### ColumnFilter<T> Interface

The `ColumnFilter<T>` interface defines the configuration for column-specific filtering behavior.

| Property       | Type                                   | Description                                                                                     | Default Value |
|----------------|----------------------------------------|-------------------------------------------------------------------------------------------------|---------------|
| `filterPredicate?`     | `(data: T, filter: string) => boolean` | A custom function for filtering column data. Returns `true` if the data matches the filter criteria. | N/A           |

#### Cell Truncation
When a text cell is truncated according to the property truncationLimit, an information icon appears to allow the complete value to be viewed in a dialog.

### Rows

#### RowsConfig Interface

The `RowsConfig<T>` interface defines the configuration settings for table rows.

| Property         | Type                       | Description                                                                                     | Default Value |
|------------------|----------------------------|-------------------------------------------------------------------------------------------------|---------------|
| `showRowNumbers?` | `boolean`                  | Displays row numbers in the first column.                                                      | `false`       |
| `multiRowSelection?`    | `boolean`                  | Enable multiple rows to be selected via checkboxes.                                             | `false`       |
| `hover?`          | `boolean`                  | Enables hover color styling for rows.                                                                | `false`       |
| `zebraRows?`      | `boolean`                  | Alternates row background colors for better readability.                                        | `false`       |
| `rowClass?`       | `(row: T) => string \| string[]`       | A function to dynamically assign CSS classes to rows based on their data.                      | `undefined`   |

#### RowActionsConfig<T> Interface

The `RowActionsConfig<T>` interface defines the configuration for row-level actions in the table.

| Property         | Type                     | Description                                                                                     | Default Value |
|------------------|--------------------------|-------------------------------------------------------------------------------------------------|---------------|
| `stickyActions`  | `boolean`               | Determines whether the actions column should remain fixed while scrolling.                      | `false`       |
| `actions`        | `RowAction<T>[]`        | Array of available actions for each row.                                                        | `[]`          |

#### RowAction<T> Interface

The `RowAction<T>` interface defines an action that can be performed on an individual row in the table.

| Property     | Type                     | Description                                                                                     | Default Value |
|--------------|--------------------------|-------------------------------------------------------------------------------------------------|---------------|
| `label`      | `string`                 | The label displayed for the action button.                                                     | N/A           |
| `description?`| `string`      | An optional description providing more details about the action.                                | `undefined`   |
| `action`     | `(row: T) => void`       | Function executed when the action is triggered for a specific row.                              | N/A           |
| `disabled?`   | `(row: T) => boolean` | Function that determines if the action should be disabled for a specific row.                   | `undefined`   |

#### SelectedRowAction<T> Interface

The `SelectedRowAction<T>` interface defines an action that can be performed on multiple selected rows in the table.

| Property     | Type                     | Description                                                                                     | Default Value |
|--------------|--------------------------|-------------------------------------------------------------------------------------------------|---------------|
| `label`      | `string`                 | The label displayed for the action button.                                                     | N/A           |
| `description?`| `string`      | An optional description providing more details about the action.                                | `undefined`   |
| `action`     | `(rows: T[]) => void`    | Function executed when the action is triggered for the selected rows.                          | N/A           |
| `disabled`   | `(rows: T[]) => boolean` (optional) | Function that determines if the action should be disabled for the selected rows.                | `undefined`   |

### Filtering

#### SearchBarConfig Interface

The `SearchBarConfig` interface defines the configuration options for a table's search bar.

| Property         | Type       | Description                                                                                     | Default Value         |
|------------------|------------|-------------------------------------------------------------------------------------------------|-----------------------|
| `label?`         | `string`   | The label text displayed for the search input.                                                  | `"Search"`            |
| `placeholder?`   | `string`   | The placeholder text shown inside the search input field.                                       | `"Search table for..."` |
| `debounceDelay?` | `number`   | The delay in milliseconds before the filter is applied. Useful for reducing filter operations.  | `500`                 |

### Sorting

#### SortConfig<T> Interface

The `SortConfig<T>` interface defines the configuration options for table sorting.

| Property         | Type                                   | Description                                                                                     | Default Value |
|------------------|----------------------------------------|-------------------------------------------------------------------------------------------------|---------------|
| `initialSort?`   | `InitialSort`                         | Defines the initial sorting configuration when the table is first loaded.                       | `undefined`   |
| `sortFunc?`      | `(item: T, property: string) => string \| number` | A custom function to determine how items are sorted. Allows defining custom sorting behavior.   | `undefined`   |

#### InitialSort Interface

The `InitialSort` interface defines the initial sorting state of the table.

| Property         | Type               | Description                                                                                     | Default Value |
|------------------|--------------------|-------------------------------------------------------------------------------------------------|---------------|
| `active`         | `string`           | The column field name used for initial sorting.                                                 | N/A           |
| `direction`      | `SortDirection`   | The initial sorting direction.    

### Auto Refreshing

#### AutoRefreshConfig Interface

The `AutoRefreshConfig` interface defines the configuration for automatically refreshing table data.

| Property     | Type                     | Description                                                                                     | Default Value |
|--------------|--------------------------|-------------------------------------------------------------------------------------------------|---------------|
| `enabled`    | `boolean`                | Indicates whether auto-refresh is enabled. When `true`, the table will automatically refresh at predefined intervals. | N/A           |
| `onChange`   | `(enabled: boolean) => void` | Callback function triggered when the auto-refresh state changes. Can be used to start or stop automatic data refresh. | N/A           |

## 🧩 Components

### MttTable

The `MttTable` component is the core component of the library, providing a robust and configurable Material table.

#### Inputs for `MttTable<T>`

The following table outlines the `@Input` properties available in the `MttTable` component:

| Input         | Type              | Description                                                                                     | Default Value |
|---------------|-------------------|-------------------------------------------------------------------------------------------------|---------------|
| `tableConfig` | `TableConfig<T>`  | Configuration object for the table, including columns, rows, actions, and other settings.       | N/A           |
| `tableData`   | `T[]`             | Array of data to be displayed in the table.                                                    | `[]`          |
| `pageIndex`   | `number`          | Current page index for paginated data.                                                         | N/A           |
| `pageSize`    | `number`          | Number of items to display per page.                                                           | N/A           |
| `loading`     | `boolean`         | Indicates whether the table is in a loading state.                                             | `false`       |

#### Outputs for `MttTable<T>`

The following table outlines the `@Output` properties available in the `MttTable` component:

| Output         | Type                | Description                                                                                     |
|----------------|---------------------|-------------------------------------------------------------------------------------------------|
| `filterChange` | `EventEmitter<string>` | Event emitted when the search bar value changes. The emitted value is the updated filter string. |
| `sortChange`   | `EventEmitter<Sort>`   | Event emitted when the sort state changes. The emitted value is the updated sort configuration. |


### MttTextDisplayModal

The `MttTextDisplayModal` component is a very simple model for displaying text. In this package, it is what powers the ability to view truncated cell values in `MttTable<T>` component. Since it is a modal, its values come from data (injected MAT_DIALOG_DATA).

#### Data of MttTextDisplayModal

| Input          | Type         | Description             | Default Value                |
|----------------|--------------|-------------------------|------------------------------|
| `title?`       | `string`     | Header for modal.       | `"Text Display"`             |
| `text`         | `string`     | A string of text.       | N/A                          |

---

## 🎨 Styles

### Global CSS Variables

The following CSS variables are defined in `variables.scss` to provide consistent styling for the MttTable components:

| Variable Name                                | Default Value         | Description                                                                 |
|---------------------------------------------|-----------------------|-----------------------------------------------------------------------------|
| `--mtt-form-field-font-size`                | `.875rem`             | Font size for form fields.                                                  |
| `--mtt-search-bar-width`                    | `37.5rem`             | Width of the search bar.                                                    |
| `--mtt-header-row-height`                   | `2.5625rem`           | Height of the table header row.                                             |
| `--mtt-header-row-background-color`         | `#eeeeee`             | Background color of the table header row.                                   |
| `--mtt-row-height`                          | `2.25rem`             | Height of table rows.                                                       |
| `--mtt-row-hover-odd-background-color`      | `#dddddd`             | Background color for odd rows on hover.                                     |
| `--mtt-row-hover-even-background-color`     | `#d0d0d0`             | Background color for even rows on hover.                                    |
| `--mtt-row-zebra-odd-background-color`      | `var(--mat-app-background-color, transparent)` | Background color for odd rows in zebra striping.                           |
| `--mtt-row-zebra-even-background-color`     | `#eeeeee`             | Background color for even rows in zebra striping.                           |
| `--mtt-action-column-sticky-left-border`    | `#b4b5bb`             | Border color for sticky action columns.                                     |
| `--mtt-paginator-height`                    | `3.5rem`              | Height of the paginator.                                                    |
| `--mtt-paginator-mat-form-field-height`     | `2.5625rem`           | Height of the paginator's form field.                                       |
| `--mtt-paginator-range-actions-height`      | `2.5rem`              | Height of the paginator's range actions.                                    |
| `--mtt-paginator-font-size`                 | `.875rem`             | Font size for the paginator.                                                |

---

## 🔗 Pipes

#### PathValuePipe

The `PathValuePipe` is used to traverse nested data structures and return the value of a specified property.

| Parameter       | Type               | Description                                                                                     |
|------------------|--------------------|-------------------------------------------------------------------------------------------------|
| `pathValue`   | `string`           | The dot-separated path to the desired property in the object.                                   |

**Example:**

In a component:
```ts
const user = { name: 'Alice', address: { city: 'New York' } };
const city = this.pathValuePipe.transform<typeof user, string>(user, 'address.city');
console.log(city); // Outputs: 'New York'
```

In a template:
```html
{{ user | pathValue:'address.city' }} <!-- Outputs 'New York' -->
```

---

## 🛠️ Services

### MttTableColumnService

The `MttTableColumnService` provides utility methods to assist with column-related operations in the table.

| Method                  | Parameters                          | Return Type       | Description                                                                                     |
|-------------------------|-------------------------------------|-------------------|-------------------------------------------------------------------------------------------------|
| `flattenObjectToColumns<T>`        | `columns: Column<any>[]`           | `string[]`        | Flattens a nested column structure into a list of column field names.                          |
| `flattenColumnsAndMerge<T>`        | `columns: Column<any>[]`           | `string[]`        | Flattens a nested column structure into a list of column field names.                          |

**Examples:**

```ts
// Flatten object into an array of TextColumn<T>
const nestedObject = { id: 1, name: 'John Doe' };
const determineColumnTypeFn = (key, value, path) => ({
  type: 'text',
  field: path,
  header: key,
  sortable: true,
  visible: true,
});
const columns = flattenObjectToColumns(nestedObject, determineColumnTypeFn);
```

```ts
// Flatten objects in the data to get column properties and merge with existing columns.
currentColumns = this.mttTableColumnService.flattenAndMergeColumns(
  fooTableData[barIndex].address,
  determineColumnTypeFn,
  currentColumns,
  'address'
);
```
---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🐜 Issues

For issues, please open an [issue](https://github.com/admcfarland/ngx-mat-table-toolkit/issues).  

---

## 🌟 Show your support

If you find this library useful, please ⭐ it on GitHub!

