import {Component, Input, TemplateRef} from '@angular/core';
import {Card} from 'primeng/card';
import {NgTemplateOutlet} from '@angular/common';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'page-header',
  imports: [
    Card,
    NgTemplateOutlet,
    Button,
    RouterLink
  ],
  templateUrl: 'page-header.html'
})
export class PageHeader {
  @Input() title;
  @Input() backLink: string;
  @Input() middle: TemplateRef<any>;
  @Input() end: TemplateRef<any>;
}
