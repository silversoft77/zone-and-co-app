// 1. Advanced ES6 JavaScript – Data Transformation

import * as log from 'N/log';

const transactions = [
  { id: 1, type: 'sale', lines: [ { item: 'A', amount: 100 }, { item: 'B', amount: 200 } ] },
  { id: 2, type: 'refund', lines: [ { item: 'A', amount: -50 } ] }
];

const result: Record<string, number> = {};

transactions.forEach(tx => {
  const total = tx.lines.reduce((sum, line) => sum + line.amount, 0);
  result[tx.type] = (result[tx.type] || 0) + total;
});

for (const type in result) {
  log.debug({ title: `Total for ${type}`, details: result[type].toString() });
}
