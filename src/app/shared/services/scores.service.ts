import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Round } from '../models/round';
import { Score } from '../models/score';
import { PlayersService } from './players.service';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  private scoresSubject = new BehaviorSubject<Score[]>([]);
  readonly scoresObs = this.scoresSubject.asObservable();
  readonly numberOfRounds = 10;

  constructor(private playersSrv: PlayersService) {}

  initScores(): void {
    const players: string[] = this.playersSrv.players;
    const rounds: Round[] = Array.from({ length: this.numberOfRounds }, () => ({
      points: [],
      total: null,
    }));
    const scores: Score[] = players.map((player) => ({
      player,
      rounds,
      total: 0,
    }));
    this.scoresSubject.next(scores);
  }

  addScore(indexToUpdate: number, scoreToAdd: number): void {
    const scores: Score[] = this.scoresSubject.getValue();
    const playerRounds: Round[] = scores[indexToUpdate].rounds || [];

    const roundIndex: number = playerRounds.findIndex((r) => r.points.length !== 2);
    const roundToUpdate: Round = playerRounds[roundIndex];

    if (!roundToUpdate) {
      return;
    }

    const updatedPoints: number[] =
      scoreToAdd === 10 && !roundToUpdate.points.length
        ? [scoreToAdd, 0]
        : [...roundToUpdate.points, scoreToAdd];
    const updatedTotal: number | null = this.calculateRoundTotal(updatedPoints);

    if (updatedTotal !== null && updatedTotal > 10) {
      return;
    }

    const updatedRound: Round = {
      points: updatedPoints,
      total: updatedTotal,
    };

    const updatedRounds: Round[] = playerRounds.map((r, i) =>
      i === roundIndex ? updatedRound : r,
    );

    const updatedScores: Score[] = scores.map((playerScore, i) => {
      const rounds: Round[] = i === indexToUpdate ? updatedRounds : playerScore.rounds;
      const total: number = this.calculateTotal(rounds);
      return {
        ...playerScore,
        rounds,
        total,
      };
    });

    this.scoresSubject.next(updatedScores);
  }

  private calculateRoundTotal(points: number[]): number | null {
    if (points.length !== 2) {
      return null;
    }

    return points.reduce((total: number, point: number) => (total += point), 0);
  }

  private calculateTotal(rounds: Round[]): number {
    return rounds.reduce((total: number, round: Round) => (total += round.total || 0), 0);
  }
}
