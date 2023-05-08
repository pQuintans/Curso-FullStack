import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/model/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {
  modalRef = {} as BsModalRef;

  public eventos: Evento[] = [];
  public filteredEventos: Evento[] = [];

  public widthImg: number = 150;
  public marginImg: number = 2;
  public showImg: boolean = true;
  private _filter: string = '';

  constructor(private eventoService: EventoService, private modalService: BsModalService, private toastr: ToastrService, private spinner: NgxSpinnerService, private router: Router,) {}

  public get filter(): string {
    return this._filter;
  }

  public set filter(value: string) {
    this._filter = value;
    this.filteredEventos = this.filter ? this.filterEvents(this.filter) : this.eventos;
  }

  public ngOnInit(): void {
    this.getEventos();
  }

  public changeImgVisibility(): void {
    this.showImg = !this.showImg;
  }

  public filterEvents(filterBy: string): Evento[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: {tema: string; local: string}) =>
        evento.tema.toLocaleLowerCase().indexOf(filterBy) !== -1
        || evento.local.toLocaleLowerCase().indexOf(filterBy) !== -1
    )
  }

  public getEventos(): void {
    this.spinner.show()
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.filteredEventos = this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide()
        this.toastr.error('Erro ao carregar os eventos', 'Erro!');
      },
      complete: () => this.spinner.hide()
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('O evento foi deletado com sucesso', 'Deletado!')
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number) {
    this.router.navigate([`/eventos/detalhe/${id}`]);
  }
}
