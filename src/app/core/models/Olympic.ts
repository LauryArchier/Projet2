import { Participation } from "./Participation";

export interface paysOlympique {
  id: number;
  country: string;
  participations: Participation[];
}