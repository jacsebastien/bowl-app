import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { ScoresService } from '../../../shared/services/scores.service';

enum ControlKeys {
  points = 'points',
}

export class PointsErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-score-form',
  templateUrl: './score-form.component.html',
  styleUrls: ['./score-form.component.scss'],
})
export class ScoreFormComponent implements OnInit {
  @Input() playerName: string | null = null;
  @Input() scoreIndex: number | null = null;

  form: FormGroup | null = null;
  readonly controlKeys = ControlKeys;
  errorMatcher = new PointsErrorStateMatcher();

  constructor(private fb: FormBuilder, private scoresSrv: ScoresService) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    const points: number = this.form?.value.points;

    if (this.scoreIndex !== null) {
      this.scoresSrv.addScore(this.scoreIndex, points);
      this.form?.reset();
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      [this.controlKeys.points]: [
        null,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
    });
  }
}
