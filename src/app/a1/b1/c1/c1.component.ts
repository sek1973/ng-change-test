import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  Input,
  DoCheck
} from '@angular/core';

@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html'
})
export class C1Component
  implements OnInit, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnChanges, DoCheck {
  @Input() inputValue = '';
  public changeDetectionStrategy: string;

  constructor() {
    this.changeDetectionStrategy =
      (<any>C1Component).__annotations__[0].changeDetection === 1
        ? 'ChangeDetectionStrategy.Default'
        : 'ChangeDetectionStrategy.OnPush';
  }

  onCheck() {
    console.log('C1 component OnCheck');
  }

  ngDoCheck() {
    console.log('C1 component DoCheck');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('C1 component OnChanges', changes);
  }

  ngOnInit(): void {
    console.log('C1 component OnInit');
  }

  ngAfterContentInit(): void {
    console.log('C1 component AfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('C1 component AfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('C1 component AfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('C1 component AfterViewChecked');
  }
}
