import {TotalProcessor} from './index';
import { Rental } from "../Customer";

export const regularProcessor: TotalProcessor = (currentTotal: number, rental: Rental) => {
  let r =2;
  if (rental.days > 2) {
    return r += (rental.days - 2) * 1.5;
  }
  return 2;
}