import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from "../translate.service";
import { MatSelectChange } from "@angular/material";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

export interface LanguageItem {
  label: string;
  value: string;
}

export interface ChangeLanguageEvent {
  oldLocale: string;
  newValue: string;
}

@Component({
  selector: 'language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnDestroy, OnInit {

  /**
   * Language input config
   */
  @Input() languageItems: LanguageItem[] = [
    {value: 'en', label: this.translateService.instant('en')},
    {value: 'ru', label: this.translateService.instant('ru')}
  ];

  /**
   * placeholder
   */
  @Input() placeholder: string;

  /**
   * Emit change locale
   */
  @Output() changeLocaleStart: EventEmitter<ChangeLanguageEvent> = new EventEmitter();

  /**
   * current locale
   */
  locale: string;

  /**
   * subject fir unsubscribe
   */
  private destroyed$: Subject<any> = new Subject();

  /**
   * Constructor
   * @param translateService
   */
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.translateService.locale
      .pipe(takeUntil(this.destroyed$))
      .subscribe((locale: string) => {
        this.locale = locale;
      })
  }

  /**
   * change locale
   * @param event
   */
  changeLanguage(event: MatSelectChange) {
    this.changeLocaleStart.emit(<ChangeLanguageEvent>{oldLocale: this.locale, newValue: event.value});
    if (event.value !== this.translateService.locale) {
      this.translateService.getTranslations(event.value);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
