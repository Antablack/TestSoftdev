import { Component } from '@angular/core';
import { TheatersServices } from "./services";
import { THEATERS } from "./models";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TheatersServices]
})
export class AppComponent {
  isLogged = false;
  theaters: THEATERS;
  constructor(private _theaterservices: TheatersServices) {
    _theaterservices.getalltheaters().subscribe((resu) => {
      this.theaters = resu;
    });
  }

}
