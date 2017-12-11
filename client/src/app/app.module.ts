import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import {
  MatMenuModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatCheckboxModule,
  MatIconModule, MatButtonModule, MatSelectModule, MatDialogModule, MatTabsModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatListModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ManagerComponent } from "./component/manager.components";
import { MoviesComponent } from "./component/movies/movies.components";
import { TheatersComponent } from "./component/theaters/theaters.components";
import { HomeComponent } from "./component/home/home.components";
import { AppComponent } from './app.component';
import { MoviesServices, TheatersServices } from "./services/index";
import { routing, appRoutingProviders } from "./app.route";
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ManagerComponent, MoviesComponent, TheatersComponent,HomeComponent
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatMenuModule,
    HttpModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatListModule,
    MatCheckboxModule,
    MatNativeDateModule, MatTableModule,
    routing,
    FormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
