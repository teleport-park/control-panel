/**
 * controller main model
 */
export class Controller {
  id: string;
  ip: string;
  status: string;
  description: string;
  data: ControllerData;
  constructor() {}
}

/**
 * controller data
 */
export class ControllerData {
  cpu: {
    description: string;
  };
  lan: {
    description: string;
  };
}
