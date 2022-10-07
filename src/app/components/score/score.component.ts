import { Component, OnInit } from '@angular/core';
import { ScoresService } from '../../shared/services/scores.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  constructor(private scoreSrv: ScoresService) {}
  ngOnInit(): void {
    this.scoreSrv.initScores();
  }
}
