import { Component, OnInit } from "@angular/core";
import { MOVIES, THEATERS } from "../../models";
import { MoviesServices, TheatersServices } from "../../services";
import { Global } from "../../services/global";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
@Component({
    selector: "home",
    templateUrl: "./home.views.html",
    styleUrls: ["./home.style.css"],
    providers: [MoviesServices, TheatersServices]
})
export class HomeComponent implements OnInit {
    url: string;
    lisMovies: Array<MOVIES>;
    lisTheaters: Array<THEATERS>;
    constructor(private route: ActivatedRoute,
        private router: Router, private _movieservices: MoviesServices,
        private _theathersservices: TheatersServices) {
        this.url = Global.URL;
        this._theathersservices.getalltheaters().subscribe((resu) => {
            this.lisTheaters = resu;
        });

        this._movieservices.getAllMovies().subscribe((resu) => {
            this.lisMovies = resu;
        });
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            if (id) {
                this._theathersservices.getMoviesxTheaters(id).subscribe((resu) => {
                    this.lisMovies = resu;
                })
            }
        });
    }
}