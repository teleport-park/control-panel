import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {IPackage, Package} from './package.model';
import {PackagesService} from './packages.service';
import {TranslateService} from '../../../../common/translations-module';
import {Router} from '@angular/router';
import {ConfirmDialogComponent, ConfirmDialogData} from '../../../../common/shared-module';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Currency} from '../../../utils/utils';

@Component({
  selector: 'packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  readonly MIN: number = 0;

  readonly MAX: number = 100000

  static readonly PLAYERS_MAX: number = 5;

  _players: number[] = [];

  private destroyed$: Subject<boolean> = new Subject();

  @ViewChild('formTemplate') formTemplate: TemplateRef<any>;

  displayedColumns: string[] = ['name', 'players', 'cost', 'charge', 'enabled', 'actions'];

  dataSource: MatTableDataSource<IPackage>;

  _form: FormGroup;

  _editPackage: IPackage = null;

  constructor(public service: PackagesService,
              public cd: ChangeDetectorRef,
              public translations: TranslateService,
              private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.packages$.pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.cd.markForCheck();
    });

    this.service.getPackages();
    for (let i = 1; i <= PackagesComponent.PLAYERS_MAX; i++) {
      this._players.push(i);
    }
  }

  edit(item: IPackage) {
    this._form = this.initForm();
    this._form.patchValue(item);
    this._editPackage = item;
    this.cd.markForCheck();
  }

  applyFilter(value) {
    this.dataSource.filter = value;
  }

  delete(pack: IPackage) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'DIALOG_CONFIRM_TITLE',
        message: 'DIALOG_REMOVE_CONFIRM_MESSAGE',
        messageParams: [pack.name]
      } as ConfirmDialogData,
      autoFocus: false
    }).afterClosed()
      .subscribe((res) => {
        if (!res) {
          return;
        }
        this.service.deletePackage(pack.id);
      });
  }

  addPackage() {
    const newPackage = new Package();
    const data = this.dataSource.data;
    data.push(newPackage);
    this.dataSource = new MatTableDataSource(data);
    this._form = this.initForm();
    this._form.patchValue(newPackage);
    this._editPackage = newPackage;
  }

  cancel() {
    if (this._editPackage.id === '-1') {
      const data = this.dataSource.data.filter((i: IPackage) => i.id !== '-1')
      this.dataSource = new MatTableDataSource(data);
    }
    this._editPackage = null;
  }

  save() {
    this._form.markAllAsTouched();
    if (this._form.valid) {
      const request = this._form.getRawValue() as IPackage;
      request.charge.currency = Currency.TLPVR;
      if (request.id === '-1') {
        delete request.id
      }
      this.service.addPackage(request, request.id)
      this._form = null;
      this._editPackage = null;
    }
  }

  private initForm() {
    return this.fb.group({
      id: '',
      name: ['', Validators.required],
      note: '',
      players: null,
      cost: this.fb.group({
        amount: [null, [Validators.required, Validators.min(this.MIN), Validators.max(this.MAX)]],
        currency: Currency.BYN,
      }),
      charge: this.fb.group({
        amount: [null, [Validators.required, Validators.min(this.MIN), Validators.max(this.MAX)]],
        currency: Currency.TLPVR
      }),
      enabled: true
    })
  }
}
