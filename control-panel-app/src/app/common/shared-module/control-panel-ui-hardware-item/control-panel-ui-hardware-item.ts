export interface HardwareItem {
  title: string;
  data: HardwareItemData;
  status: 'busy' | 'free';
}

export interface HardwareItemData {
  desc: string;
  cpuDesc: string;
  lanDesc: string;
}
