import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { MOVIES } from "../models";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Global } from "./global";
@Injectable()
export class MoviesServices {
    url: string;
    constructor(private _http: Http) {
        this.url = Global.URL;
    }
    getAllMovies() {
        return this._http.get(this.url + "getallmovies").map(res => res.json());
    }

    getMoviexId(id) {
        return this._http.get(this.url + "movies/" + id).map(res => {
            let movie = res.json()[0];
            movie.RELEASEDATE = new Date(movie.RELEASEDATE);
            return movie;
        });
    }

    deleteMovies(id) {
        return this._http.delete(this.url + "movies/" + id).map(res => res.text().toString());
    }

    saveMovies(movie: MOVIES, files) {
        let url = this.url;
        return new Promise(function (resolve, reject) {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append("name", movie.NAME);
            formData.append("lenguage", movie.LENGUAGE);
            formData.append("releasedate", movie.RELEASEDATE.getFullYear() + "/" + (movie.RELEASEDATE.getMonth() + 1) + "/" + movie.RELEASEDATE.getDate());
            for (var i = 0; i < files.length; i++) {
                formData.append("image", files[i], files[i].name);
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            if (movie.MOVIEID) {
                xhr.open("POST", url + "movies/" + movie.MOVIEID, true);
            } else {
                xhr.open("POST", url + "movies", true);
            }
            xhr.send(formData);
        });
    }


}