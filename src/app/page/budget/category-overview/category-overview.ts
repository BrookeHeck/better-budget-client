import {Component, inject, OnInit} from '@angular/core';
import {BudgetStore} from '../../../store/budget-store';
import {UserStore} from '../../../store/user-store';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {CurrencyPipe} from '@angular/common';
import {Dialog} from 'primeng/dialog';
import {CategoryForm} from '../category-form/category-form';
import {BudgetCategory} from '../../../model/budget-category/budget-category';

@Component({
  selector: 'category-overview',
  imports: [
    Card,
    TableModule,
    Button,
    CurrencyPipe,
    Dialog,
    CategoryForm
  ],
  templateUrl: 'category-overview.html'
})
export class CategoryOverview implements OnInit {
  protected readonly budgetStore = inject(BudgetStore);
  private readonly  userStore = inject(UserStore);

  protected categoryDialogVisible: boolean = false;
  protected budgetCategory = new BudgetCategory();

  ngOnInit() {
    this.budgetStore.getBudgetCategoriesForUser(this.userStore.user().userId);
  }

  onCategoryDialogClose() {
    this.categoryDialogVisible = false;
    this.budgetCategory = new BudgetCategory();
  }

  openCategoryDialog() {
    this.categoryDialogVisible = true;
  }

  async submitCategoryForm(budgetCategory: BudgetCategory) {
    if(budgetCategory.budgetCategoryId) {
      await this.budgetStore.updateBudgetCategory(budgetCategory);
    } else if(!budgetCategory.budgetCategoryId) {
      budgetCategory.active = true;
      budgetCategory.userId = this.userStore.user().userId;
      await this.budgetStore.createBudgetCategory(budgetCategory);
    }
    this.onCategoryDialogClose();
  }

  selectBudgetCategory(budgetCategory: BudgetCategory) {
    this.budgetCategory = budgetCategory;
    this.openCategoryDialog();
  }
}
