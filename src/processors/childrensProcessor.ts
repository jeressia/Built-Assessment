import {TotalProcessor} from './index';
import { Rental } from "../Customer";

export const childrensProcessor: TotalProcessor = (currentTotal: number, rental: Rental) => {
  let r =1.5;
  if (rental.days > 3) {
    return r += (rental.days - 3) * 1.5;
  }
  return 1.5;
}