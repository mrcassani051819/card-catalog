import { Component, OnInit, Input } from '@angular/core';
import { Card } from "../card";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { CardService } from "../card.service";

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})

export class CardDetailComponent implements OnInit {

  @Input() card?: Card;
  
  constructor(private route: ActivatedRoute, private cardService: CardService, private location: Location) { }

  ngOnInit(): void {
    this.getCard();
  }

  getCard(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.cardService.getCard(id).subscribe(card => this.card = card);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.cardService.updateCard(this.card).subscribe(() => this.goBack());
  }

}
