import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/regions.type';
import { CountriesService } from '../../services/countries.service';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public regions: Region[] = ['America','Europe','Asia','Africa','Oceania'];
  public selectionRegion?:Region;
  constructor(private countriesService: CountriesService){
    this.countries= this.countriesService.cacheStore.byRegion.countries;
    this.selectionRegion= this.countriesService.cacheStore.byRegion.region;
   }

  searchByRegion(region: Region): void {
    this.selectionRegion = region
    this.countriesService.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
      })
  }
}
