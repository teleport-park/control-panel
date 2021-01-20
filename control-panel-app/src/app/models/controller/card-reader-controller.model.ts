import { BaseController } from './base-controller.model';

export class CardReaderController extends BaseController {
  enabled: boolean;
  id: string
  constructor(controller) {
    super(controller);
  }
}