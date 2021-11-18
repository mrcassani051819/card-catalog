import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

import { Card } from "../card";
import { CardService } from "../card.service";

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})

export class CardSearchComponent implements OnInit {
  cards$!: Observable<Card[]>;
  private searchTerms = new Subject<string>();

  constructor(private cardService: CardService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.cards$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.cardService.searchCards(term))
    );
  }

}
