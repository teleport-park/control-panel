export class WhoIsResponse {
    id: string;
    roles: string[];
    display_name: string;
    account: {
        id: string,
        balance: {
            amount: number,
            currency: string
        }[]
    };
    // profile: {
    //     id: string;
    //     display_name: string,
    //     fullname: string;
    //     nickname: string;
    //     gender: string;
    //     phone: string;
    //     email: string;
    //     age: number;
    //     comment: string
    // };
    // card: {
    //     id: string;
    //     chip_id: string;
    //     issued_at: Date;
    //     bound_at: Date;
    //     expires_at: Date;
    // };
    // account: {
    //     id: string;
    //     balance: {
    //         currency: string;
    //         amount: number;
    //     } []
    // };
}
