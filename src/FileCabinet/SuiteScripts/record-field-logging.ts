// 3. SuiteScript 2.1 + TypeScript – Record Field Logging

import * as record from 'N/record';
import * as log from 'N/log';

export function logRecordFields(type: string, id: number): void {
  const rec = record.load({ type, id });
  const fieldIds = rec.getFields();
  fieldIds.forEach(field => {
    const val = rec.getValue({ fieldId: field });
    log.debug({ title: field, details: String(val) });
  });
}