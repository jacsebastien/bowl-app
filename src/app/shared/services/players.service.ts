import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private _players: string[] = [];

  get players(): string[] {
    return this._players;
  }

  create(name: string): void {
    this._players.push(name);
  }

  reset(): void {
    this._players = [];
  }
}
