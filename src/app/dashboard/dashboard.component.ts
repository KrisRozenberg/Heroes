import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  numberMessage?: string;
  lastEditedMessage?: string;

  constructor(private heroService: HeroService,
              public translateService: TranslateService) { }

  ngOnInit(): void {
    this.getHeroes();

    this.translateService.get("MESSAGE.LAST_EDITED").subscribe(message => {
      let editedMessage = message;
      this.heroService.lastEditedHero.subscribe(name => this.lastEditedMessage = editedMessage + name);
    });

    this.translateService.get("MESSAGE.LEFT_NUMBER").subscribe(message => {
      let numberMessage = message;
      this.heroService.heroesNumber.subscribe(number => this.numberMessage = numberMessage + number);
    });
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes
        .sort((hero1, hero2) => hero1.level - hero2.level)
        .slice(-4));
  }
}
