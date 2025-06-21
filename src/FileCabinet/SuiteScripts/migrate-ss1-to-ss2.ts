// 5. Migration from SuiteScript 1.0 to 2.1 with Enhancements

import * as record from 'N/record';
import * as email from 'N/email';
import * as log from 'N/log';

export function updateCustomer(customerId: number): void {
  const customer = record.load({ type: record.Type.CUSTOMER, id: customerId });
  const emailAddr = customer.getValue({ fieldId: 'email' }) as string;

  customer.setValue({ fieldId: 'custentity_contacted', value: true });
  customer.save();

  log.debug({ title: 'Email Sent', details: emailAddr });

  email.send({
    author: -5,
    recipients: emailAddr,
    subject: 'Thanks!',
    body: 'Message'
  });
}