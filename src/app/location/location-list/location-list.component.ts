import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../../character/character.service';
import { Character } from '../../character/character';
import { MatPaginator } from '@angular/material/paginator';
import { NgForm } from '@angular/forms';
import { LocationService } from '../location.service';
import { LocationClass } from '../location';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.sass']
})
export class LocationListComponent implements OnInit {

  locations: LocationClass[] = [];
  paginatedLocations: LocationClass[] = [];
  searchTerm: string = '';
  
  // Define el tamaño de la página y las opciones de tamaño de la página
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  loading: boolean = true;
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.loadLocations();
    console.log('Locaciones cargados');
    
  }

  ngAfterViewInit(): void {
    console.log(this.paginator.pageSize);
}

  loadLocations() {
    this.loading=true;
    this.locationService.getLocations().subscribe((data) => {
      this.locations = data;
      // this.obtainCharacters();
      this.paginateLocations();
      this.loading=false;
    });
  }

  paginateLocations() {
    if (this.paginator && this.paginator.pageSize) {
      console.log('Sirvio');
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      console.log(this.paginator.pageIndex);
      this.paginatedLocations = this.locations.slice(startIndex, endIndex);
    }
    else if (this.paginator) {
      console.log('Sirvio');
      const startIndex = this.paginator.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      console.log(this.paginator.pageIndex);
      this.paginatedLocations = this.locations.slice(startIndex, endIndex);
    }
  }

  getFilteredLocations(searchTerm: string = '') {
    this.loading=true;
    this.locationService.getFilteredLocations(searchTerm).subscribe((data) => {
      this.locations = data;
      // this.obtainCharacters();
      this.paginator.pageIndex=0
      this.paginateLocations();
      this.loading=false;
    });
  }

  search() {
    console.log('Entró s');
    this.getFilteredLocations(this.searchTerm);
    console.log('Salio s');
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.paginator.pageIndex=0
    this.loadLocations(); // Puedes llamar a tu función de carga aquí si es necesario
    this.searchTerm="";
  }

  onPageChange(event: any) {
    console.log('Entró 2');
    // Maneja los cambios de página
    this.paginateLocations();
  }

}
