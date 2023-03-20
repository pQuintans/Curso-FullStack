import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  public eventos: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe({
      next: (response: any) => {
        this.eventos = response;
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
