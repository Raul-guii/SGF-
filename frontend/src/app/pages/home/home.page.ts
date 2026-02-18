import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home.page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage implements OnInit {

  phrases = [
    {
      titulo: "Está com dificuldades na gestão financeira?",
      descricao: "Centralize contratos e cobranças em um único sistema."
    },
    {
      titulo: "Faturas atrasadas estão virando rotina?",
      descricao: "Automatize vencimentos e reduza prejuízos."
    },
    {
      titulo: "Sem controle do faturamento mensal?",
      descricao: "Tenha relatórios claros e organizados em tempo real."
    }
  ];

  currentIndex = 0;

  next() {
    this.currentIndex =
      (this.currentIndex + 1) % this.phrases.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.phrases.length) % this.phrases.length;
  }

  ngOnInit() {
    setInterval(() => {
      this.next();
    }, 5000);
  }
}
