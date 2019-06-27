import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-a2',
  templateUrl: './a2.component.html'
})
export class A2Component
  implements OnInit, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnChanges, DoCheck {
  public changeDetectionStrategy: string;

  constructor() {
    this.changeDetectionStrategy =
      (<any>A2Component).__annotations__[0].changeDetection === 1
        ? 'ChangeDetectionStrategy.Default'
        : 'ChangeDetectionStrategy.OnPush';
  }

  onCheck() {
    console.log('A2 component OnCheck');
  }

  ngDoCheck() {
    console.log('A2 component DoCheck');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('A2 component OnChanges', changes);
  }

  ngOnInit(): void {
    console.log('A2 component OnInit');
  }

  ngAfterContentInit(): void {
    console.log('A2 component AfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('A2 component AfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('A2 component AfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('A2 component AfterViewChecked');
  }
}
