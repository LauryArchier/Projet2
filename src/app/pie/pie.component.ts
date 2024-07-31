import { Component, OnInit, OnDestroy } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { paysOlympique } from '../core/models/Olympic';
import { Participation } from '../core/models/Participation';
import { Chart, ChartEvent, ActiveElement, registerables } from 'chart.js/auto';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit, OnDestroy {

  private subscription: Subscription | null = null;

  constructor(private olympicService: OlympicService, private router: Router) {}

  protected olympics: paysOlympique[] | undefined;
  protected labels: string[] = [];
  protected datas: number[] = [];
  totalJOs: number = 0;
  totalCountries: number = 0;

  ngOnInit(): void {
    this.subscription = this.olympicService.getOlympics().subscribe(response => {
      console.log('Données reçues:', response);
      this.olympics = response;
      if (this.olympics) {
        this.labels = this.olympics.map(country => country.country);
        this.datas = this.olympics.map(country => {
          return country.participations.reduce((sum: number, participation: Participation) => sum + participation.medalsCount, 0);
        });
        this.totalCountries = this.olympics.length;
        this.totalJOs = this.olympics.reduce((sum: number, country) => sum + country.participations.length, 0);
        console.log('Labels:', this.labels);
        console.log('Datas:', this.datas);
        console.log('Total JOs:', this.totalJOs);
        console.log('Total Countries:', this.totalCountries);
      }
      this.generateChart();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  generateChart() {
    const canvas = document.getElementById('myPieChart') as HTMLCanvasElement;
    if (canvas) {
      const chart = new Chart(canvas, {
        type: 'pie',
        data: {
          labels: this.labels,
          datasets: [{
            label: ' Médailles',
            data: this.datas,
            borderWidth: 1
          }]
        },
        options: {
          onClick: this.onChartClick.bind(this),
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Canvas element not found');
    }
  }

  onChartClick(event: ChartEvent, elements: ActiveElement[]) {
    if (elements.length > 0) {
      const chartElement = elements[0];
      const countryIndex = chartElement.index;
      const selectedCountry = this.olympics ? this.olympics[countryIndex] : null;

      if (selectedCountry) {
        console.log('Navigating to line chart for country:', selectedCountry.country);
        this.router.navigate(['/line', selectedCountry.country]);
      }
    }
  }
}
