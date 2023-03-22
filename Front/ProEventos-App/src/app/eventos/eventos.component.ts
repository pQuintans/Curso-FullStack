import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  public filteredEventos: any = [];
  public eventos: any = [];
  widthImg: number = 150;
  marginImg: number = 2;
  showImg: boolean = true;
  private _filter: string = '';

  public get filter(): string {
    return this._filter;
  }

  public set filter(value: string) {
    console.log(this.filterEvents(this.filter))
    this._filter = value;
    this.filteredEventos = this.filter ? this.filterEvents(this.filter) : this.eventos;
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEventos();
  }

  public changeImgVisibility(): void {
    this.showImg = !this.showImg;
  }

  filterEvents(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: {tema: string; local: string}) =>
        evento.tema.toLocaleLowerCase().indexOf(filterBy) !== -1
        || evento.local.toLocaleLowerCase().indexOf(filterBy) !== -1
    )
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe({
      next: (response: any) => {
        this.eventos = response;
        this.filteredEventos = this.eventos;
      },
      error: (error: any) => {
        console.log(error);
      }
    })

    // this.eventos = [
    //   {
    //     tema: 'Angular',
    //     local: 'Belo Horizonte'
    //   },
    //   {
    //     tema: '.NET Core',
    //     local: 'São Paulo'
    //   },
    //   {
    //     tema: 'Angular e .NET Core',
    //     local: 'Rio de Janeiro'
    //   }
    // ];
  }
}
