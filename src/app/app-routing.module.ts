import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PieComponent } from './pie/pie.component';
import { LineComponent } from './line/line.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pie', component: PieComponent },
  { path: 'line/:country', component: LineComponent },
  { path: '**', redirectTo: '' } // Redirige les chemins non trouvés vers la page d'accueil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
