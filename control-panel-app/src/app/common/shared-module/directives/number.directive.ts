import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Directive({
    selector: 'input[number]'
})

export class NumberDirective {

    @Input() max: number = 99;
    /**
     * element ref
     */
    private el: HTMLInputElement;

    /**
     * pattern
     */
    pattern = '^[0-9]+$';

    /**
     * constructor
     */
    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    /**
     * listener for key down event
     */
    @HostListener('keydown', ['$event']) onKeyPress(event: KeyboardEvent) {
        if (event.keyCode !== 8 && event.keyCode !== 46 && event.keyCode !== 37 && event.keyCode !== 39 && !event.ctrlKey) {
            return new RegExp(this.pattern).test(event.key);
        }
    }
}

// tslint:disable-next-line:directive-selector
@Directive({selector: 'input[amount-format]'})

export class AmountFormatDirective {

    @Input() max: number = 100000;

    private _allowedKey: number[] = [8, 46, 37, 39];

    /**
     * input message value
     */
    @Input() message: string;

    /**
     * element ref
     */
    private el: HTMLInputElement;

    /**
     * pattern
     */
    pattern: RegExp = new RegExp('^[0-9\.]+$');

    /**
     * snack bar instance
     */
    snackBar: MatSnackBar;

    /**
     * constructor
     */
    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    /**
     * listener for key down event
     */
    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        if (this.isAllowedKeyCode(e.keyCode)) {
            return true;
        }
        const decimal = this.el.value.split('.')[1];
        if ((!e.ctrlKey && !this.pattern.test(e.key)) ||
            (e.key === '.' && !this.el.value) ||
            (decimal && decimal.length === 2 && this.el.selectionStart === this.el.selectionEnd) ||
            (Number(this.el.value.toString() + e.key) > this.max)
        ) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

    }

    /**
     * listener for blur event
     */
    @HostListener('blur', ['$event'])
    onBlur(event: any) {
        event.target.value = this.formatValue(event.target.value.trim());
    }

    private formatValue(value: string) {
        return Number(value).toFixed(2);
    }

    /**
     * listener for paste event
     */
    @HostListener('paste', ['$event'])
    onPaste(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    private isAllowedKeyCode(code: number) {
        return this._allowedKey.includes(code);
    }
}
