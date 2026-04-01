import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {BudgetCategory} from '../../../model/budget-category/budget-category';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputNumber} from 'primeng/inputnumber';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';

@Component({
  selector: 'category-form',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputNumber,
    InputText,
    Button
  ],
  templateUrl: 'category-form.html'
})
export class CategoryForm implements OnChanges {
  @Input() category: BudgetCategory;
  @Output() submit: EventEmitter<BudgetCategory> = new EventEmitter();

  protected form: FormGroup = new FormGroup({
    name: new FormControl<string>(null),
    budget: new FormControl<number>(null),
  });

  ngOnChanges(changes: SimpleChanges) {
    const category = changes['category']?.currentValue;
    if(category) {
      this.form.controls['name'].setValue(category.name);
      this.form.controls['budget'].setValue(category.budget);
    }
  }

  onSubmit() {
    const {name, budget} = this.form.value;
    this.submit.emit({...this.category, name, budget});
  }
}
