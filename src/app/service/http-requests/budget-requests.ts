import {inject, Injectable} from '@angular/core';
import {HttpRequestHandler} from './http-request-handler';
import {BudgetCategory} from '../../model/budget-category/budget-category';
import {StatusUpdatePatch} from '../../model/budget-category/status-update-patch';

@Injectable({
  providedIn: 'root'
})
export class BudgetRequests {
  private readonly http = inject(HttpRequestHandler);

  private readonly endpoint = 'budget-category';

  public getBudgetCategoriesByUserId(userId: number): Promise<BudgetCategory[]> {
    return this.http.get<BudgetCategory[]>(`${this.endpoint}/${userId}`);
  }

  public createBudgetCategory(budgetCategory: BudgetCategory): Promise<BudgetCategory> {
    return this.http.post<BudgetCategory, BudgetCategory>(this.endpoint, budgetCategory);
  }

  public updateBudgetCategory(budgetCategory: BudgetCategory): Promise<BudgetCategory> {
    return this.http.put<BudgetCategory, BudgetCategory>(this.endpoint, budgetCategory);
  }

  public updateBudgetCategoryStatus(branchCategoryId: number, status: boolean): Promise<void> {
    const statusUpdatePatch = new StatusUpdatePatch(branchCategoryId, status);
    return this.http.patch<StatusUpdatePatch>(this.endpoint, statusUpdatePatch);
  }
}
