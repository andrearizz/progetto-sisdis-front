import { Component, OnInit } from '@angular/core';
import {GenService} from '../_services/gen.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  length = 16;
  password = '';
  errorMessage = '';
  constrains = [
    {
      label: 'Characters',
      value: true
    },
    {
      label: 'Digits',
      value: true
    },
    {
      label: 'Symbols',
      value: false
    }
];

  constructor(private generatorService: GenService) { }

  ngOnInit(): void {
    this.generatorService.generate(this.length,
      this.constrains[0].value, this.constrains[1].value, this.constrains[2].value)
      .subscribe(data => {
          this.password = data.password;
          console.log(this.password);
        },
        error => {
          this.errorMessage = error.error.message;
        });
  }

  onChangelenght(e): void {
    this.length = e.target.value;
    this.generatorService.generate(this.length,
      this.constrains[0].value, this.constrains[1].value, this.constrains[2].value)
      .subscribe(data => {
        this.password = data.password;
        console.log(this.password);
      },
        error => {
        this.errorMessage = error.error.message;
        });
  }

  onChangeConstraints(e): void {

    this.generatorService.generate(this.length,
      this.constrains[0].value, this.constrains[1].value, this.constrains[2].value)
      .subscribe(data => {
          this.password = data.password;
          console.log(this.password);
        },
        error => {
          this.errorMessage = error.error.message;
        });
  }
}

