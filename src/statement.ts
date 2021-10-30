import { MovieCode } from "./Movie";

import * as Processor from './processors'

const totalProcessors: Record<MovieCode, Processor.TotalProcessor> = {
  [MovieCode.CHILDRENS]: Processor.childrensProcessor,
  [MovieCode.NEW]: Processor.newProcessor,
  [MovieCode.REGULAR]: Processor.regularProcessor
}

export const statement = (customer: any, movies: any): string => {
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;
  for (let r of customer.rentals) {
    let movie = movies[r.movieID];
    let thisAmount = 0;
    const processorFn = totalProcessors[movie.code as MovieCode]
    thisAmount += processorFn(thisAmount, r)

    frequentRenterPoints++;
    if (movie.code === MovieCode.NEW && r.days > 2) frequentRenterPoints++;

    result += `\t${movie.title}\t${thisAmount}\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
};
