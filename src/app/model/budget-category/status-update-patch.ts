export class StatusUpdatePatch {
  budgetCategoryId: number;
  status: boolean;


  constructor(budgetCategoryId: number, status: boolean) {
    this.budgetCategoryId = budgetCategoryId;
    this.status = status;
  }
}
