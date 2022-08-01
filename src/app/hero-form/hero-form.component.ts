import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Hero} from "../hero";
import {Location} from "@angular/common";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  heroForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required]),
    race: new FormControl(null, [
      Validators.required]),
    heroClass: new FormControl(null, [
      Validators.required]),
    level: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9]{1,2}$"),
      Validators.min(1),
      Validators.max(99)])
  });
  @Input()
  hero?: Hero;
  @Output()
  saveHeroEvent = new EventEmitter<Hero>();

  constructor(private location: Location) { }

  ngOnInit(): void {
    if (this.hero) {
      this.initEditForm();
    }
  }

  initEditForm(): void {
    this.heroForm.controls['name'].setValue(this.hero?.name);
    this.heroForm.controls['race'].setValue(this.hero?.race);
    this.heroForm.controls['heroClass'].setValue(this.hero?.heroClass);
    this.heroForm.controls['level'].setValue(this.hero?.level);
  }

  onSubmit() {
    const name = this.heroForm.controls['name'].value.trim();
    const race = this.heroForm.controls['race'].value;
    const heroClass = this.heroForm.controls['heroClass'].value;
    const level = this.heroForm.controls['level'].value;
    const id = this.hero?.id;

    this.hero = this.hero ?
      {id, name, race, heroClass, level} as Hero :
      {name, race, heroClass, level} as unknown as Hero;

    console.log(this.hero);
    this.saveHeroEvent.emit(this.hero);
  }

  isFormValid() {
    return this.heroForm.valid;
  }

  goBack(): void {
    this.location.back();
  }
}
