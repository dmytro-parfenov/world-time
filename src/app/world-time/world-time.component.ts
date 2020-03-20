import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {WorldTimeService} from './world-time.service';
import {catchError, takeUntil, tap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Subject, throwError} from 'rxjs';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-world-time',
  templateUrl: './world-time.component.html',
  styleUrls: ['./world-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WorldTimeService]
})
export class WorldTimeComponent implements OnInit, OnDestroy {

  timezone = new FormControl();

  timezones: string[] = [];

  time = '';

  hasError = false;

  private onDestroy$ = new Subject();

  constructor(private readonly worldTimeService: WorldTimeService,
              private readonly changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadTimezones();

    this.timezone.valueChanges.pipe(
      tap(this.loadTime.bind(this)),
      catchError(this.handleError.bind(this)),
      takeUntil(this.onDestroy$)
    ).subscribe();

    this.worldTimeService.timeByIanaZone().subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  refresh() {
    if (this.timezone.value) {
      this.loadTime(this.timezone.value);
      return;
    }

    this.loadTimezones();
  }

  private loadTimezones() {
    this.hasError = false;
    this.worldTimeService.list().pipe(
      tap(timezones => {
        this.timezones = timezones;
        this.changeDetectorRef.markForCheck();
      }),
      catchError(this.handleError.bind(this))
    ).subscribe();
  }

  private loadTime(iana: string) {
    this.hasError = false;

    this.worldTimeService.timeByIanaZone(iana).pipe(
      tap(timezone => {
        this.time = DateTime.fromISO(timezone.datetime).setZone(iana).toFormat('fff');
        this.changeDetectorRef.markForCheck();
      }),
      catchError(this.handleError.bind(this))
    ).subscribe();
  }

  private handleError(error: any) {
    this.hasError = true;
    this.changeDetectorRef.markForCheck();
    return throwError(error);
  }

}
