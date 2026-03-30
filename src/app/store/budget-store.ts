import {BudgetCategory} from '../model/budget-category/budget-category';
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {BudgetRequests} from '../service/http-requests/budget-requests';

type BudgetState = {
  categories: BudgetCategory[],
  loading: boolean
}

const initialState: BudgetState = {
  categories: [],
  loading: false,
}

export const BudgetStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed(store => ({
    activeCategories: computed(() => store.categories().filter(c => c.active)),
  })),
  withMethods((store, budgetRequests = inject(BudgetRequests)) => ({
    async getBudgetCategoriesForUser(userId: number): Promise<void> {
      patchState(store, {loading: true});
      const categories: BudgetCategory[] = await budgetRequests.getBudgetCategoriesByUserId(userId);
      patchState(store, {loading: false, categories});
    },
    async createBudgetCategory(category: BudgetCategory): Promise<void> {
      patchState(store, {loading: true});
      const created = await budgetRequests.createBudgetCategory(category);
      patchState(store, (state) => {
        const categories = [...state.categories, created];
        return {loading: false, categories};
      });
    },
    async updateBudgetCategory(category: BudgetCategory): Promise<void> {
      patchState(store, {loading: true});
      const updated = await budgetRequests.updateBudgetCategory(category);
      patchState(store, (state) => {
        const categories = state.categories.map(c =>
          c.budgetCategoryId === category.budgetCategoryId ? updated : c);
        return {loading: false, categories};
      });
    },
    async updateBudgetCategoryStatus(budgetCategoryId: number, status: boolean): Promise<void> {
      patchState(store, {loading: true});
      await budgetRequests.updateBudgetCategoryStatus(budgetCategoryId, status);
      patchState(store, (state) => {
        const categories = state.categories.map(c =>
          c.budgetCategoryId === budgetCategoryId ? {...c, status} : c);
        return {loading: false, categories};
      });
    },
  }))
)
