

export interface Ticket {
    id :string;
    number:number;
    createdAt:Date;
    handleAtDesk?: string //escritorio 1 , o 2
    handleAt?:Date;
    done:boolean;
    // doenAt:boolean;
}