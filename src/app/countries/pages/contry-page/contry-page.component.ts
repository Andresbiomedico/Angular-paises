import { CountriesService } from './../../services/countries.service';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { switchMap, debounceTime } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-contry-page',
  templateUrl: './contry-page.component.html',
  styleUrls: ['./contry-page.component.css']
})
export class ContryPageComponent implements OnInit{

  public country?:Country;

  constructor(
    private activateRoute:ActivatedRoute,
    private countriesService:CountriesService,
    private router:Router
    ){}

  ngOnInit(): void {
    this.activateRoute.params
    .pipe(
      switchMap(({id})=>this.countriesService.searchCountryByAlphaCode(id))
    )
    .subscribe(country=>{
      if(!country) return this.router.navigateByUrl('');
      return this.country = country;
    })
  }

}
