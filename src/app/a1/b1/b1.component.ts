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
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-b1',
  templateUrl: './b1.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class B1Component
  implements OnInit, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnChanges, DoCheck {
  @ViewChild('runCheck', { static: true }) runCheck;
  @ViewChild('infiniteButton') set infiniteButton(value: HTMLElement) {
    console.log('B1 ViewChild set: ', value);
  }
  private _generateError = false;
  public value = '';
  public changeDetectionStrategy: string;
  public loopCount = 0;

  private _inputValue = '';
  @Input()
  set inputValue(val: string) {
    console.log('value from parent (A1):', val);
    this._inputValue = val;
    this.parentChange.emit(val);
  }
  get inputValue(): string {
    return this._inputValue;
  }
  @Output() parentChange: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private applicationRef: ApplicationRef
  ) {
    this.changeDetectionStrategy =
      (<any>B1Component).__annotations__[0].changeDetection === 1
        ? 'ChangeDetectionStrategy.Default'
        : 'ChangeDetectionStrategy.OnPush';
  }

  onCheck() {
    console.log('B1 component OnCheck');
  }

  ngDoCheck() {
    console.log('B1 component DoCheck');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('B1 component OnChanges', changes);
  }

  ngOnInit(): void {
    console.log('B1 component OnInit');
  }

  ngAfterContentInit(): void {
    console.log('B1 component AfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('B1 component AfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('B1 component AfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('B1 component AfterViewChecked');
    if (this._generateError) {
      this.parentChange.emit('Test value'); // this will cause ExpressionChangedAfterItHasBeenCheckedError :)
    }
    if (this.loopCount) {
      Promise.resolve().then(() => {
        this.parentChange.emit('Loop test value ' + this.loopCount--);
      }); // this will cause infinite loop of change detection cycles - limited to loopCount number to avoid browser hanging
    }
  }

  toggleGenerateError(event: any) {
    this._generateError = !this._generateError;
  }

  onButtonClick() {
    this.value = 'Change from B1 button ' + new Date().toLocaleTimeString();
    this.parentChange.emit(this.value);
    if (this.runCheck.nativeElement.checked) {
      this.changeDetectorRef.detectChanges();
    }
  }

  infiniteLoopClick() {
    this.loopCount = 10;
    this.value = 'Change from B1 infinite loop button ' + new Date().toLocaleTimeString();
    this.parentChange.emit(this.value);
    if (this.runCheck.nativeElement.checked) {
      this.changeDetectorRef.detectChanges();
    }
  }
}
