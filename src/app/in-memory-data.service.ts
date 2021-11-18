import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Card } from "./card";

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const cards = [
      { id: 0, number: 32, name: "Elston Howard" },
      { id: 1, number: 14, name: "Bill Skowron" },
      { id: 2, number: 1, name: "Bobby Richardson" },
      { id: 3, number: 34, name: "Clete Boyer"},
      { id: 4, number: 10, name: "Tony Kubek" },
      { id: 5, number: 8, name: "Yogi Berra" },
      { id: 6, number: 7, name: "Mickey Mantle" },
      { id: 7, number: 9, name: "Roger Maris" },
      { id: 8, number: 28, name: "Bud Daley" },
      { id: 9, number: 16, name: "Whitey Ford" },
      { id: 10, number: 45, name: "Rollie Sheldon" },
      { id: 11, number: 22, name: "Bill Stafford" },
      { id: 12, number: 23, name: "Ralph Terry" },
      { id: 13, number: 26, name: "Tex Clevenger" },
      { id: 14, number: 18, name: "Hal Reniff" },
      { id: 15, number: 47, name: "Luis Arroyo" }
    ];
    return {cards};
  }

  genId(cards: Card[]): number {
    return cards.length > 0 ? Math.max(...cards.map(card => card.id)) + 1 : 16;
  }

}
