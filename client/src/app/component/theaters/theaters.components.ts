import { Component } from "@angular/core";
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { THEATERS, MOVIES } from "../../models";
import { TheatersServices, MoviesServices } from "../../services";
import { Global } from "../../services/global";
@Component({
    selector: "theaters",
    templateUrl: "./theaters.views.html",
    providers: [TheatersServices, MoviesServices]
})
export class TheatersComponent {
    dataSource: Array<THEATERS>;
    url: string;
    selected: THEATERS;
    LisMovies: Array<MOVIES>;
    Movies = [];
    constructor(private _snackBar: MatSnackBar, private _theathersservices: TheatersServices, private _movieservices: MoviesServices) {
        this.cargarDatos();
        this.cargarDatosMovies();
        this.selected = new THEATERS();
        this.url = Global.URL;
    }

    cargarDatos() {
        this._theathersservices.getalltheaters().subscribe((resu) => {
            this.dataSource = resu;
        });
    }

    cargarDatosMovies() {
        this._movieservices.getAllMovies().subscribe((resu) => {
            this.LisMovies = resu;
        });
    }
    openSnackBar(message: string) {
        this._snackBar.open(message, "", {
            duration: 2000,
        });
    }

    btnSave_click() {
        this._theathersservices.saveTheaters(this.selected, this.Movies).then((resu) => {
            console.log(resu);
            if (resu == 'success') {
                this.openSnackBar("Se ha Guardado Correctamente");
                this.selected = new THEATERS();
                this.cargarDatos();
                this.Movies = [];
                this.cargarDatosMovies();
            } else {
                this.openSnackBar("Ha ocurrido un error");
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    btnActualizarMovie_click(){
        this.cargarDatosMovies();
    }
    btnEdit_click(id) {
        this._theathersservices.gettheatersxId(id).subscribe((resu) => {
            this.selected = resu;
            this._theathersservices.getMoviesxTheaters(id).subscribe(resu => {
                this.Movies = [];
                resu.map(x => {
                    this.Movies.push(x.MOVIEID);
                });
                this.cargarDatos();
            })
        })
    }

    btnDelete_click(id) {
        if (confirm("Esta seguro que desea Continuar?")) {
            this._theathersservices.deletetheaters(id).subscribe((resu) => {
                if (resu == 'success') {
                    this.openSnackBar("Se ha Eliminado Correctamente");
                    this.cargarDatos();
                } else {
                    this.openSnackBar("Ha ocurrido un error");
                }
            })
        }
    }

    chk_click(id, event) {
        if (event.target.checked) {
            this.Movies.push(id);
        } else {
            let isValid = this.Movies.findIndex((x) => x == id);
            this.Movies.splice(isValid, 1);
        }
    }

    exists(id) {
        return this.Movies.findIndex((x) => x == id);
    }
}