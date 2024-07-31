import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PieComponent } from './pie/pie.component';
import { LineComponent } from './line/line.component';
import { OlympicService } from './core/services/olympic.service';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, PieComponent, LineComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [OlympicService],
  bootstrap: [AppComponent],
})
export class AppModule { }