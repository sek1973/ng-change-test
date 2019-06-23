import { B1Component } from './b1/b1.component';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';

@Component({
  selector: 'app-a1',
  templateUrl: './a1.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class A1Component
  implements OnInit, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnChanges {
  @ViewChild('runCheck') runCheck;
  @ViewChild('elementValue') elementValue;
  @ViewChild('appB1') appB1: B1Component;
  timer: any;
  bindingValue = '';
  public changeDetectionStrategy: string;

  constructor(private changeDetectorRef: ChangeDetectorRef, private zone: NgZone) {
    this.changeDetectionStrategy =
      (<any>A1Component).__annotations__[0].changeDetection === 1
        ? 'ChangeDetectionStrategy.Default'
        : 'ChangeDetectionStrategy.OnPush';
  }

  onCheck() {
    console.log('A1 component OnCheck');
  }

  detach() {
    this.changeDetectorRef.detach();
    this.clearValues();
    this.changeDetectorRef.detectChanges();
  }

  reattach() {
    this.changeDetectorRef.reattach();
    this.clearValues();
  }

  clearValues() {
    this.bindingValue = undefined;
    this.elementValue.nativeElement.innerText = '';
    this.appB1.value = '';
  }

  setOuterTimer() {
    this.clearTimer();
    this.zone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        this.bindingValue = 'run OUTSIDE Angular - setInterval: ' + new Date().toLocaleTimeString();
        this.elementValue.nativeElement.innerText = this.bindingValue;
      }, 1000);
    });
  }

  setInnerTimer() {
    this.clearTimer();
    this.timer = setInterval(() => {
      this.bindingValue = 'run inside Angular - setInterval: ' + new Date().toLocaleTimeString();
      this.elementValue.nativeElement.innerText = this.bindingValue;
    }, 1000);
  }

  clearTimer() {
    this.clearValues();
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('A1 component OnChanges', changes);
  }

  ngOnInit(): void {
    console.log('A1 component OnInit');
  }

  ngAfterContentInit(): void {
    console.log('A1 component AfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('A1 component AfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('A1 component AfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('A1 component AfterViewChecked');
  }

  onChangeFromChild(event: string) {
    this.bindingValue = event;
  }

  onButtonClick() {
    this.bindingValue = 'Changed by A1 button click ' + new Date().toLocaleTimeString();
    this.elementValue.nativeElement.innerText = this.bindingValue;
    if (this.runCheck.nativeElement.checked) {
      this.changeDetectorRef.detectChanges();
    }
  }
}
