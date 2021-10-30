import { Rental } from "../Customer";

export interface TotalProcessor {
  (currentTotal: number, rental: Rental): number
}