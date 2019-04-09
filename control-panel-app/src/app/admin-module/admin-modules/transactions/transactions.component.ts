import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './services/transactions.service';

@Component({
  selector: 'control-panel-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  displayedColumns: string[] = [
    'number',
    'date',
    'document',
    'operation',
    'invoiceNumber',
    'currency',
    'amount',
    'correspondent',
    'signature'
  ];

  columnWithData: string[] = [
    'number',
    'date',
    'document',
    'operation',
    'invoiceNumber',
    'currency',
    'amount',
    'correspondent',
    'signature'
  ];

  constructor(public service: TransactionsService) {
  }

  ngOnInit() {
  }

}
