import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent {
  public countries:Country[]=[];
  public isLoading: boolean = false;
  public initialValue:string = '';

  constructor(private countriesService:CountriesService){
     this.countries= this.countriesService.cacheStore.byCountries.countries;
     this.initialValue= this.countriesService.cacheStore.byCountries.term;
  }

  searchByCountry(term:string):void{
    this.isLoading= true;
    this.countriesService.searchCountry(term)
    .pipe(
      tap(countries =>console.log(countries))
    )
    .subscribe(countries =>{
      this.countries = countries
      this.isLoading= false;
    })
  }
}
