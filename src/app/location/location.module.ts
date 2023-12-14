import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BarraModule } from '../barra/barra.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';

/**
 * LocationModule: Módulo que encapsula componentes y dependencias relacionadas con la visualización de ubicaciones.
 *
 * Este módulo incluye componentes para listar ubicaciones y mostrar detalles de una ubicación específica.
 * También importa módulos de Angular Material y otros módulos personalizados necesarios para su funcionamiento.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    BarraModule,
    MatProgressBarModule
  ],
  declarations: [LocationListComponent, LocationDetailComponent],
  exports: [LocationListComponent, LocationDetailComponent]
})
export class LocationModule { }
