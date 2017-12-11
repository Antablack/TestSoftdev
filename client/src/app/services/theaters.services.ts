import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { THEATERS } from "../models";
import { Global } from "./global";
@Injectable()
export class TheatersServices {
    public url: string;
    constructor(private _http: Http) {
        this.url = Global.URL;
    }
    getMoviesxTheaters(id) {
        return this._http.get(this.url + "moviesxtheaters/" + id).map(resu => resu.json());
    }

    getalltheaters() {
        return this._http.get(this.url + "getalltheaters").map(resu => resu.json());
    }

    gettheatersxId(id) {
        return this._http.get(this.url + "theaters/" + id).map(res => res.json()[0]);
    }

    deletetheaters(id) {
        return this._http.delete(this.url + "theaters/" + id).map(res => res.text().toString());
    }

    saveTheaters(theater: THEATERS, MoviesId: any) {
        let url = this.url;
        return new Promise(function (resolve, reject) {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append("name", theater.NAME);
            formData.append("location", theater.LOCATION);
            formData.append("movies", JSON.stringify(MoviesId));
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            if (theater.THEATERSID) {
                xhr.open("POST", url + "theaters/" + theater.THEATERSID, true);
            } else {
                xhr.open("POST", url + "theaters", true);
            }
            xhr.send(formData);
        });
    }

}