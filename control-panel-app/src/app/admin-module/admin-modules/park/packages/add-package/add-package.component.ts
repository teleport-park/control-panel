import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '../../../../../common/translations-module';
import { Currencies } from '../../../../utils/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { PackagesService } from '../packages.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../../common/shared-module';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Charge, Package, Payment } from '../package.model';
import { Promo } from '../../promo/promo.model';
import { PromoService } from '../../promo/services/promo.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'add-package',
    templateUrl: './add-package.component.html',
    styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit, OnDestroy {

    destroyed$: Subject<boolean> = new Subject();

    _currencies = Currencies;

    form: FormGroup;

    payments: FormArray;

    charges: FormArray;

    plans: FormArray;

    promos: Promo[];

    _excludedPromo: string[] = [];

    _packageId: string = null;

    constructor(public fb: FormBuilder,
                public translationService: TranslateService,
                public service: PackagesService,
                private promoService: PromoService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private cd: ChangeDetectorRef,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        if (this.service.packages$.getValue().length) {
            this.promos = [{id: 'null', display_name: this.translationService.instant('DEFAULT_PROMO'), enabled: true} as Promo, ...this.service.promo$.getValue()].filter(i => !i.removed );
            this.initPackage();
        } else {
            this.service.promo$.pipe(takeUntil(this.destroyed$))
                .subscribe((promos: Promo[]) => {
                    this.promos = [{id: 'null', display_name: this.translationService.instant('DEFAULT_PROMO'), enabled: true} as Promo, ...promos].filter(i => !i.removed);
                    this.initPackage();
                });
            this.service.getPackages();
        }
    }

    private initPackage() {
        this._packageId = this.activatedRoute.snapshot.params.id;
        if (this._packageId) {
            this.service.getPackage(this._packageId)
            .subscribe((pack: Package) => {
                this.initForm();
                this.form.patchValue(pack);
                pack.plans.forEach((plan: { promo_id: string, charges: Charge[], payments: Payment[] }) => {
                    const planControl = this.getPlan();
                    planControl.patchValue({...plan, ...{promo_id: plan.promo_id ? plan.promo_id : 'null'}});
                    if (plan.promo_id) {
                        this._excludedPromo.push(plan.promo_id);
                    }
                    const charges = planControl.get('charges') as FormArray;
                    plan.charges.forEach((charge: Charge) => {
                        const control = this.getCharge();
                        control.patchValue(charge);
                        charges.push(control);
                    });
                    const payments = planControl.get('payments') as FormArray;
                    plan.payments.forEach((payment: Payment) => {
                        const control = this.getPayment();
                        control.patchValue(payment);
                        payments.push(control);
                    });
                    this.plans.push(planControl);
                });
                this.cd.markForCheck();
            });
        } else {
            this.initForm();
        }
        this.cd.markForCheck();
    }

    initForm() {
        this.plans = this.fb.array([]);
        this.form = this.fb.group({
            name: ['', Validators.required],
            players: [1, [Validators.required, Validators.pattern('[0-9]+'), Validators.min(1), Validators.max(15)]],
            note: '',
            enabled: false,
            plans: this.plans
        });
    }

    getPayment() {
        return this.fb.group({
            currency: Currencies[1],
            amount: ['', Validators.required]
        });
    }

    getCharge() {
        return this.fb.group({
            currency: Currencies[0],
            amount: ['', Validators.required],
            players: [[]]
        });
    }

    getPlan() {
        return this.fb.group({
            promo_id: 'null',
            payments: this.fb.array([]),
            charges: this.fb.array([])
        });
    }

    addPlan() {
        this.plans.push(this.getPlan());
    }

    addPayment(index: number) {
        (this.plans.at(index).get('payments') as FormArray).push(this.getPayment());
    }

    addCharge(index: number) {
        (this.plans.at(index).get('charges') as FormArray).push(this.getCharge());
    }

    removePayment(parentIndex: number, index: number) {
        (this.plans.at(parentIndex).get('payments') as FormArray).removeAt(index);
    }

    removeCharge(parentIndex: number, index: number) {
        (this.plans.at(parentIndex).get('charges') as FormArray).removeAt(index);
    }

    removePlan(index: number) {
        this.plans.removeAt(index);
        this.updateExcludedPromo();
    }

    submit() {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            return;
        }
        const payload = this.form.getRawValue() as Package;
        payload.plans.forEach(plan => {
            plan.promo_id = plan.promo_id === 'null' ? null : plan.promo_id;
        });
        if (this._packageId) {
            this.service.editPackage(payload, this._packageId);
        } else {
            this.service.addPackage(payload);
        }
        this.router.navigate(['admin', 'park', 'packages']);
    }

    getPlayersArray() {
        const array = [];
        for (let i = 0; i < 5; i++) {
            array.push(i);
        }
        return array;
    }

    back() {
        this.router.navigate(['admin', 'park', 'packages']);
    }

    dropPayment(event: CdkDragDrop<AbstractControl[]>) {
        moveItemInArray(this.payments.controls, event.previousIndex, event.currentIndex);
    }

    dropCharge(event: CdkDragDrop<AbstractControl[]>) {
        moveItemInArray(this.charges.controls, event.previousIndex, event.currentIndex);
    }

    excludePromo(value: string, index: number) {
        if (value === 'null') {
            return true;
        }
        if (this.plans.at(index).get('promo_id').value === value) {
            return true;
        }
        return !this._excludedPromo.includes(value);
    }

    updateExcludedPromo() {
        this._excludedPromo = this.plans.getRawValue().map(i => i.promo_id).filter(i => i !== 'null');
    }

    /**
     * show confirm dialog
     */
    private showConfirmDialog(parentIndex: number, index?: number, payments?: boolean) {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'DIALOG_CONFIRM_TITLE',
                message: !index ? 'REMOVE_PLAN_CONFIRM_MASSAGE' :  payments ? 'REMOVE_PAYMENT_CONFIRM_MASSAGE' : 'REMOVE_CHARGE_CONFIRM_MESSAGE',
                messageParams: [!index ? (parentIndex + 1).toString() : (index + 1).toString()]
            } as ConfirmDialogData,
            autoFocus: false
        }).afterClosed()
        .subscribe((res) => {
            if (!res) {
                return;
            }
            if (!index) {
                this.removePlan(parentIndex);
            } else {
                if (payments) {
                    this.removePayment(parentIndex, index);
                } else {
                    this.removeCharge(parentIndex, index);
                }
            }
            this.cd.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}


