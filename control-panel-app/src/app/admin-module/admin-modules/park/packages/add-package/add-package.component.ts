import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '../../../../../common/translations-module';
import { Currencies } from '../../../../utils/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { PackagesService } from '../packages.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../../common/shared-module';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Charge, Package, Payment } from '../package.model';

@Component({
    selector: 'add-package',
    templateUrl: './add-package.component.html',
    styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {

    _currencies = Currencies;

    form: FormGroup;

    payments: FormArray;

    charges: FormArray;

    plans: FormArray;

    promos: string[];

    _packageId: string = null;

    constructor(public fb: FormBuilder,
                public translationService: TranslateService,
                public service: PackagesService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private cd: ChangeDetectorRef,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.initForm();
        this._packageId = this.activatedRoute.snapshot.params['id'];
        if (this._packageId) {
            this.service.getPackage(this._packageId)
            .subscribe((res: Package) => {
                this.form.patchValue(res);
                res.plans.forEach((plan: { promo: string, charges: Charge[], payments: Payment[] }) => {
                    const planControl = this.getPlan();
                    planControl.patchValue(plan);
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
            });
        }
        this.promos = this.service.promo$.getValue();
        console.log(this.form);
    }

    initForm() {
        this.plans = this.fb.array([]);
        this.form = this.fb.group({
            name: ['', Validators.required],
            players: [1, [Validators.required, Validators.pattern('[0-9]+'), Validators.min(1), Validators.max(15)]],
            note: '',
            plans: this.plans
        });
    }

    getPayment() {
        return this.fb.group({
            amount: this.fb.group({
                currency: Currencies[1],
                amount: ['', Validators.required],
                inPercentage: false
            }),
            note: ''
        });
    }

    getCharge() {
        return this.fb.group({
            amount: this.fb.group({
                currency: Currencies[0],
                amount: ['', Validators.required],
                inPercentage: false
            }),
            note: '',
            players: []
        });
    }

    getPlan() {
        return this.fb.group({
            promo: null,
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

    removePayment(parentIndex, index) {
        (this.plans.at(parentIndex).get('payments') as FormArray).removeAt(index);
    }

    removeCharge(parentIndex, index) {
        (this.plans.at(parentIndex).get('charges') as FormArray).removeAt(index);
    }

    submit() {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            return;
        }
        const payload = new Package(this.form.getRawValue());
        console.log(payload);
        if (this.service.packageIdForEdit) {
            this.service.editPackage(payload);
        } else {
            this.service.addPackage(payload);
        }
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

    /**
     * show confirm dialog
     */
    private showConfirmDialog(parentIndex: number, index: number, payments?: boolean) {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'DIALOG_CONFIRM_TITLE',
                message: payments ? 'REMOVE_PAYMENT_CONFIRM_MASSAGE' : 'REMOVE_CHARGE_CONFIRM_MESSAGE',
                messageParams: [(index + 1).toString()]
            } as ConfirmDialogData,
            autoFocus: false
        }).afterClosed()
        .subscribe((res) => {
            if (!res) {
                return;
            }
            if (payments) {
                this.removePayment(parentIndex, index);
            } else {
                this.removeCharge(parentIndex, index);
            }
            this.cd.markForCheck();
        });
    }
}
