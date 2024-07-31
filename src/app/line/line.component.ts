import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from '../core/services/olympic.service';
import { Participation } from '../core/models/Participation';
import { Chart } from 'chart.js/auto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit, OnDestroy {
  country: string | null = null;
  participations: Participation[] = [];
  labels: number[] = [];
  data: number[] = [];
  private subscription: Subscription | null = null;
  totalMedals: number = 0;
  totalAthletes: number = 0;

  constructor(
    private route: ActivatedRoute, 
    private olympicService: OlympicService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.country = this.route.snapshot.paramMap.get('country');
  
    if (this.country) {
      this.subscription = this.olympicService.getOlympics().subscribe(response => {
        const selectedCountry = response.find(c => c.country === this.country);
        if (selectedCountry) {
          this.participations = selectedCountry.participations;
          this.labels = this.participations.map(p => p.year);
          this.data = this.participations.map(p => p.medalsCount);
          this.totalMedals = this.data.reduce((sum, current) => sum + current, 0);
          this.totalAthletes = this.participations.reduce((sum, current) => sum + current.athleteCount, 0);
          this.generateChart();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  generateChart() {
    const canvas = document.getElementById('myLineChart') as HTMLCanvasElement;
    if (canvas) {
      console.log('Canvas element found:', canvas);
      new Chart("myLineChart", {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [{
            label: `Number of Medals for ${this.country}`,
            data: this.data,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.1
          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Year'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Medals'
              }
            }
          }
        }
      });
    } else {
      console.error('Canvas element not found');
    }
  }
}
