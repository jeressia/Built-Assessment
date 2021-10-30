import { MovieCode } from "./Movie";
import {StatementFormat} from './Format'

import * as Processor from './processors'

const totalProcessors: Record<MovieCode, Processor.TotalProcessor> = {
  [MovieCode.CHILDRENS]: Processor.childrensProcessor,
  [MovieCode.NEW]: Processor.newProcessor,
  [MovieCode.REGULAR]: Processor.regularProcessor
}

export const statement = (format: StatementFormat, customer: any, movies: any): string => {
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = `<h1>Rental Record for <em>${customer.name}</em></h1>\n`;
  result += `<ul>\n`
  for (let r of customer.rentals) {
    let movie = movies[r.movieID];
    let thisAmount = 0;
    const processorFn = totalProcessors[movie.code as MovieCode]
    thisAmount += processorFn(thisAmount, r)

    frequentRenterPoints++;
    if (movie.code === MovieCode.NEW && r.days > 2) frequentRenterPoints++;

    result += `\t<li>${movie.title} - ${thisAmount}</li>\n`;
    totalAmount += thisAmount;
  }
  result += `</ul>\n`
  result += `<p>Amount owed is <em>${totalAmount}</em><p>\n`;
  result += `<p>You earned <em>${frequentRenterPoints}</em> frequent renter points<p>\n`;

  return (format == StatementFormat.HTML ? result : result.replace(/<[^>]+>/g, ''));
};
 