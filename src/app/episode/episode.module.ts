import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeListComponent } from './episode-list/episode-list.component';
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
import { EpisodeDetailComponent } from './episode-detail/episode-detail.component';

/**
 * EpisodeModule: Módulo que encapsula componentes y dependencias relacionadas con la visualización de episodios.
 *
 * Este módulo incluye componentes para listar episodios y mostrar detalles de un episodio específico.
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
  declarations: [EpisodeListComponent, EpisodeDetailComponent],
  exports: [EpisodeListComponent, EpisodeDetailComponent]
})
export class EpisodeModule { }
