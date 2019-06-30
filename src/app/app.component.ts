import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { A1Component } from './a1/a1.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent
  implements OnInit, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnChanges, DoCheck {
  private _detached = false;
  public changeDetectionStrategy: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
    private applicationRef: ApplicationRef
  ) {
    this.changeDetectionStrategy =
      (<any>AppComponent).__annotations__[0].changeDetection === 1
        ? 'ChangeDetectionStrategy.Default'
        : 'ChangeDetectionStrategy.OnPush';
  }

  @ViewChild('appA1', { static: true }) appA1: A1Component;

  detach() {
    this._detached = true;
    this.changeDetectorRef.detach();
    this.appA1.elementValue.nativeElement.innerText = '';
    this.appA1.bindingValue = undefined;
    this.changeDetectorRef.detectChanges();
    this.changeDetectorRef.markForCheck();
  }

  reattach() {
    this._detached = false;
    this.changeDetectorRef.reattach();
    this.appA1.elementValue.nativeElement.innerText = '';
    this.appA1.bindingValue = undefined;
    this.changeDetectorRef.detectChanges();
  }

  onCheck() {
    console.log('App component OnCheck');
  }

  ngDoCheck() {
    console.log('App component DoCheck');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('App component OnChanges', changes);
  }

  ngOnInit(): void {
    console.log('App component OnInit');
  }

  ngAfterContentInit(): void {
    console.log('App component AfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('App component AfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('App component AfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('App component AfterViewChecked');
  }

  doCheck(event: any) {
    if (this._detached) {
      this.changeDetectorRef.detectChanges();
    }
  }
}
