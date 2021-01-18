import { StaffMember, Visitor } from '../../../../models';
import { BoundCardDialogComponent } from '../../../../common/shared-module/dialogs/bound-card-dialog/bound-card-dialog.component';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../../../common/shared-module';

export class Bind {
  constructor(readonly dialog, readonly cardService) {
  }

  bindCard(user: StaffMember | Visitor, type) {
    this.dialog.open(BoundCardDialogComponent, {
      data: {
        user
      }
    }).afterClosed()
      .pipe(
        filter(data => !!data),
        mergeMap((cardId: string) => {
          return this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: 'DIALOG_CONFIRM_TITLE',
              message: 'DIALOG_BIND_CARD_CONFIRM_MESSAGE',
              messageParams: [cardId, user.display_name]
            },
            disableClose: true
          }).afterClosed().pipe(
            filter(data => !!data),
            map(_ => cardId)
          )
        })
      )
      .subscribe((cardId: string) => {
        if (cardId) {
          this.cardService.bindCard(cardId, {id: user.id, type});
        }
      });
  }
}