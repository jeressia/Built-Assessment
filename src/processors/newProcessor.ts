import {TotalProcessor} from './index';
import { Rental } from "../Customer";

export const newProcessor: TotalProcessor = (currentTotal: number, rental: Rental) => {
  return rental.days * 3;
}