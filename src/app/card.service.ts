import { Injectable } from '@angular/core';

import { Observable, of } from "rxjs";

import { Card } from "./card";
import { CARDS } from "./mock-cards";

import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class CardService {

  private cardsUrl = "api/cards";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }
  
  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl).pipe(
        tap(_ => this.log("fetched cards")),
        catchError(this.handleError<Card[]>("getCards", []))
    );
  }

  getCard(id: number): Observable<Card> {
    const url = `${this.cardsUrl}/${id}`;
    return this.http.get<Card>(url).pipe(
      tap(_ => this.log(`fetched card id=${id}`)),
      catchError(this.handleError<Card>(`getCard id=${id}`))
    );
  }

  private log(message: string): void {
    this.messageService.add(`CardService: ${message}`);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  updateCard(card: Card): Observable<any> {
    return this.http.put(this.cardsUrl, card, this.httpOptions).pipe(
      tap(_ => this.log(`update card id=${card.id}`)),
      catchError(this.handleError<any>("updateCard"))
    );
  }

  addCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.cardsUrl, card, this.httpOptions).pipe(
      tap((newCard: Card) => this.log(`added card with id=${newCard.id}`)),
      catchError(this.handleError<Card>("addCard"))
    );
  }

  deleteCard(id: number): Observable<Card> {
    const url = `${this.cardsUrl}/${id}`;
    return this.http.delete<Card>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted card id=${id}`)),
      catchError(this.handleError<Card>("deleteCard"))
    );
  }

  searchCards(term: string): Observable<Card[]> {
    if(!term.trim()) {
      return of([]);
    }
    return this.http.get<Card[]>(`${this.cardsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found cards matching '${term}'`) :
        this.log(`no cards found matching '${term}'`)
      ),
      catchError(this.handleError<Card[]>("searchCards", []))
    );
  }
}
