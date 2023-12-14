import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterModule } from './character/character.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BarraModule } from './barra/barra.module';
import { EpisodeModule } from './episode/episode.module';
import { LocationModule } from './location/location.module';

/**
 * Módulo principal de la aplicación Angular.
 * Configura y declara los componentes, módulos y servicios necesarios.
 */
@NgModule({
  declarations: [	
    AppComponent
   ],
  imports: [
    BrowserModule,
    CharacterModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BarraModule,
    EpisodeModule,
    LocationModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
