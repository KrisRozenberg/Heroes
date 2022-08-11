import { Component } from '@angular/core';
import {HeroService} from "./hero.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(private heroService: HeroService,
              public translateService: TranslateService) { }

  getHeroesNumber(): void {
    this.heroService.getHeroesNumber();
  }
}
