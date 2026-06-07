import { Temporal} from "@js-temporal/polyfill";


export interface Course{
    readonly id: string;
    title: string;
    capacisty: number;
    startDate?: Temporal.PlainDate;
}