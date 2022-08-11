import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {Hero} from "../hero";
import { HeroService } from '../hero.service';
import {HeroRace} from "../hero-race";
import {HeroClass} from "../hero-class";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;
  path?: string;

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location,
              private router: Router,
              public translateService: TranslateService) { }

  ngOnInit(): void {
    this.path = this.route.routeConfig?.path;

    if(this.path != 'addHero') {
      this.getHero();
    }
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => {this.hero = hero;
      console.log(hero);
      console.log(this.hero)});
  }

  goBack(): void {
    this.location.back();
  }

  saveHero(hero: Hero): void {
    this.hero = hero;

    console.log("save hero method");
    if (this.path == 'addHero') {
      console.log("Here");
      this.heroService.addHero(this.hero)
        .subscribe(_ => {
          this.router.navigateByUrl('/heroes').then();
        });
    }
    else {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  getHeroRace(value: HeroRace | undefined): string {
    let race = "";
    switch (value) {
      case 0:
        this.translateService.get("HERO_RACE.HUMAN").subscribe(heroRace => race = heroRace);
        break;
      case 1:
        this.translateService.get("HERO_RACE.CREATURE").subscribe(heroRace => race = heroRace);
        break;
      case 2:
        this.translateService.get("HERO_RACE.HOMUNCUL").subscribe(heroRace => race = heroRace);
        break;
      default:
        race = "none";
    }
    return race;
  }

  getHeroClass(value: HeroClass | undefined): string {
    let heroClass = "";
    switch (value) {
      case 0:
        this.translateService.get("HERO_CLASS.WARRIOR").subscribe(foundClass => heroClass = foundClass);
        break;
      case 1:
        this.translateService.get("HERO_CLASS.MAGE").subscribe(foundClass => heroClass = foundClass);
        break;
      case 2:
        this.translateService.get("HERO_CLASS.CLOWN").subscribe(foundClass => heroClass = foundClass);
        break;
      default:
        heroClass = "none";
    }
    return heroClass;
  }
}
