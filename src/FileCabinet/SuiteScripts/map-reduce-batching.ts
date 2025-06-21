// 4. SuiteScript 2.1 – Map/Reduce with Batching

import * as search from 'N/search';
import * as log from 'N/log';
import { EntryPoints } from 'N/types';

type InvoiceData = {
  id: string;
};

export const getInputData: EntryPoints.MapReduce.getInputData = () => {
  return search.create({
    type: search.Type.INVOICE,
    filters: [['status', search.Operator.ANYOF, 'Open']],
    columns: ['internalid']
  });
};

export const map: EntryPoints.MapReduce.map = context => {
  const searchResult = JSON.parse(context.value) as search.Result;
  const id = searchResult.id;
  const data: InvoiceData = { id };
  context.write({ key: 'batch', value: JSON.stringify(data) });
};

export const reduce: EntryPoints.MapReduce.reduce = context => {
  const invoices: InvoiceData[] = context.values.map(val => JSON.parse(val) as InvoiceData);

  for (let i = 0; i < invoices.length; i += 5) {
    const batch = invoices.slice(i, i + 5);
    log.debug({ title: 'Invoice Batch', details: JSON.stringify(batch) });
  }
};
