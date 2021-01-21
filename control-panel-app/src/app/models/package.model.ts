export class Package {
    public syncId: string;
    public cloudId: string;
    public category: string;
    public type: string;
    public title: string;
    public description: string;
    public note: string;
    public games: any;
    public expiresAt: Date;
    public price: {
        currency: string;
        amount: number;
    };
    public coins: {
        currency: string,
        amount: number
    };
    public unlim: boolean;
}

export class PackageHistory {
    public timestamp: Date;
    status: string;
}
