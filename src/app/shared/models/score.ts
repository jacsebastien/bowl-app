import { Round } from './round';

export interface Score {
  player: string;
  rounds: Round[];
  total: number | null;
}
