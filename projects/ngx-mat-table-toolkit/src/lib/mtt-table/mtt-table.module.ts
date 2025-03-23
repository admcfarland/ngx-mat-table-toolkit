import { NgModule } from '@angular/core';
import { MttTable } from './mtt-table';
import { PathValuePipe } from './pipes/path-value.pipe';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

const material = [
  CommonModule,
  MatTableModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatSortModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatSidenavModule,
  MatTooltipModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
];

const components = [
  MttTable,
];

const pipes = [
  PathValuePipe,
];

@NgModule({
  imports: [
    material,
    components,
    pipes
  ],
  exports: [
    components,
    pipes
  ]
})
export class MttTableModule { }
