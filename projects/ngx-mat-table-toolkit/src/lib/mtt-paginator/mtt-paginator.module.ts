import { NgModule } from '@angular/core';
import { MttClientPaginator } from './mtt-client-paginator/mtt-client-paginator';
import { MttServerPaginator } from './mtt-server-paginator/mtt-server-paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

const material = [
  CommonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatInputModule,
  FormsModule,
];

const components = [
  MttClientPaginator,
  MttServerPaginator,
];

@NgModule({
  imports: [
    components,
    material,
  ],
  exports: [
    components,
  ]
})
export class MttPaginatorModule { }
