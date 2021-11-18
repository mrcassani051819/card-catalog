import { Component, OnInit } from '@angular/core';
import { Card } from "../card";
import { CardService } from "../card.service";
import { MessageService } from '../message.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  cards: Card[] = [];

  constructor(private cardService: CardService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.cardService.getCards().subscribe(cards => this.cards = cards);
  }

  add(number: number, name: string): void {
    name = name.trim();
    if (!number || !name) { return; }
    this.cardService.addCard({number, name} as Card).subscribe(card => { this.cards.push(card); });
  }

  delete(card: Card): void {
    this.cards = this.cards.filter(c => c !== card);
    this.cardService.deleteCard(card.id).subscribe();
  }
}
