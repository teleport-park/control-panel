import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '../translate.service';
import { MatSelectChange } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Locales } from '../locales.enum';

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
     * language items
     */
    private _languageItems: LanguageItem[] = Object.keys(Locales)
        .map(key => Locales[key])
        .filter(value => !isNaN(Number(Locales[value])))
        .map(value => {
            return {value, label: this.translations.instant(value)};
        });

    /**
     * Language input config
     */
    @Input() set languageItems(languageItems: LanguageItem[]) {
        if (languageItems) {
            this._languageItems = languageItems;
            return;
        }
    }

    /**
     * get language items
     */
    get languageItems(): LanguageItem[] {
        return this._languageItems;
    }

    /**
     * placeholder
     */
    @Input() placeholder: string;

    /**
     * theme
     */
    @Input() theme = '';

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
     * @param translations
     * @param cd
     */
    constructor(private translations: TranslateService, private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.translations.locale
            .pipe(takeUntil(this.destroyed$))
            .subscribe((locale: string) => {
                this.locale = locale;
            });
    }

    /**
     * change locale
     * @param event
     */
    changeLanguage(event: MatSelectChange) {
        this.changeLocaleStart.emit({oldLocale: this.locale, newValue: event.value} as ChangeLanguageEvent);
        if (event.value !== this.translations.locale) {
            this.translations.getTranslations(event.value);
        }
        this.cd.markForCheck();
        this.cd.detectChanges();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
