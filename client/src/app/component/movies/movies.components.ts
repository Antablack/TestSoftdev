import { Component } from "@angular/core";
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MOVIES } from "../../models";
import { MoviesServices } from "../../services";
import { Global } from "../../services/global";
@Component({
    selector: "movies",
    templateUrl: "./movies.views.html",
    providers: [MoviesServices]
})
export class MoviesComponent {
    dataSource: Array<MOVIES>;
    url: string;
    selected: MOVIES;
    public filetoUpload: Array<File> = [];
    constructor(private _snackBar: MatSnackBar, private _movieservices: MoviesServices) {
        this.cargarDatos();
        this.selected = new MOVIES();
        this.url = Global.URL;
    }

    cargarDatos() {
        this._movieservices.getAllMovies().subscribe((resu) => {
            this.dataSource = resu;
        });
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, "", {
            duration: 2000,
        });
    }

    btnSave_click() {
        if(this.filetoUpload.length ==0){
            alert("Seleccione por lo menos una Imagen");
            return;
        }
        this._movieservices.saveMovies(this.selected, this.filetoUpload).then((resu) => {
            console.log(resu);
            if (resu == 'success') {
                this.openSnackBar("Se ha Guardado Correctamente");
                this.selected = new MOVIES();
                this.filetoUpload = [];
                this.cargarDatos();
            } else {
                this.openSnackBar("Ha ocurrido un error");
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    btnEdit_click(id) {
        this._movieservices.getMoviexId(id).subscribe((resu) => {
            this.selected = resu;
            console.log(resu);
        })
    }

    btnDelete_click(id) {
        if (confirm("Esta seguro que desea Continuar?")) {
            this._movieservices.deleteMovies(id).subscribe((resu) => {
                console.log(resu);
                if (resu == 'success') {
                    this.openSnackBar("Se ha Eliminado Correctamente");
                    this.cargarDatos();
                } else {
                    this.openSnackBar("Ha ocurrido un error");
                }
            })
        }
    }

    flu_change(fileInput: any) {
        this.filetoUpload = <Array<File>>fileInput.target.files;
    }

}
