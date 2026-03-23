import {Component, computed, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TransactionStore} from '../../../store/transaction-store';
import {TransactionItemRequests} from '../../../service/http-requests/transaction-item-requests';
import {PageHeader} from '../../../component/page-header/page-header';
import {Card} from 'primeng/card';
import {TransactionItemTable} from '../transaction-item-table/transaction-item-table';
import {Transaction} from '../../../model/transaction/transaction';
import {TransactionItem} from '../../../model/transaction/transaction-item';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {switchMap} from 'rxjs';
import {UserStore} from '../../../store/user-store';
import {TransactionForm} from '../transaction-form/transaction-form';

@Component({
  selector: 'transaction-detail',
  imports: [
    PageHeader,
    Card,
    TransactionItemTable,
    TransactionForm
  ],
  templateUrl: 'transaction-detail.html'
})
export class TransactionDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private transactionStore = inject(TransactionStore);
  private transactionItemService = inject(TransactionItemRequests);
  private userStore = inject(UserStore);

  protected transactionId: WritableSignal<number> = signal(0);
  protected transaction: Signal<Transaction> = computed(() =>
    this.transactionStore.transactions().find(t => t.transactionId === this.transactionId()));
  protected transactionItems: Signal<TransactionItem[]> = toSignal(
    toObservable(this.transactionId).pipe(
      switchMap(id => this.transactionItemService.getTransactionItemsForTransaction(id))
    )
  );

  ngOnInit() {
    if(!this.transactionStore.transactions().length) {
      this.transactionStore.loadAllTransactions(this.userStore.user().userId);
    }
    const id = this.route.snapshot.params['transactionId'];
    this.transactionId.update(() => Number(id));
  }

  updateTransaction(transaction: Transaction) {
    this.transactionStore.updateTransaction(transaction);
  }

}
