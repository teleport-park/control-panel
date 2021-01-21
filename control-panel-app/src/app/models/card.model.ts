export class Card {
   chip_id: string;
   created_at: string;
   comment: string;
   binding: {
      bound_at: string;
      user: {
         id: string;
         type: string;
         roles: string[];
         display_name: string;
      }
   };
}
