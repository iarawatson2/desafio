import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServiceRequisicao } from './app.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dados: any[] = [];
  paginatedData: any[] = [];
  searchControl: FormControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ServiceRequisicao) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.getRequisicao().subscribe(
      (data) => {
        this.dados = data;
        this.paginatedData = this.dados.slice(0, 4);
      },
      (error) => {
        console.error('Erro na requisição:', error);
      }
    );
  }

  filtrarPorTitulo() {
    const termoPesquisa = this.searchControl.value.toLowerCase();

    this.dados = this.dados.filter((post) =>
      post.title.toLowerCase().includes(termoPesquisa)
    );
  }

  limparFiltro() {
    this.searchControl.setValue('');
    this.listar();
  }
}
