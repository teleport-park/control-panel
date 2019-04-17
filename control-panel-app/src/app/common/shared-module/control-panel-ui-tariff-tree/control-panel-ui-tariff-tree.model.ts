/**
 * Tariff tree interface
 */
export interface TariffsTree {
  /**
   * root data
   */
  root: {
    name: string
  };
  children: Tariff[];
}

/**
 * tariff
 */
export interface Tariff {
  name: string;
  amount: number;
}

/**
 * tariff node
 */
export interface TariffNode {
  label: string;
  children?: TariffNode[];
  data?: any;
}
