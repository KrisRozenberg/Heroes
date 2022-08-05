import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  numberMessage?: string;
  lastEditedMessage?: string;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.heroService.heroesNumber.subscribe(number => this.numberMessage = number + " heroes left!");
    this.heroService.lastEditedHero.subscribe(name => this.lastEditedMessage = "Last edited Hero: " + name);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes
        .sort((hero1, hero2) => hero1.level - hero2.level)
        .slice(-4));
  }
}
