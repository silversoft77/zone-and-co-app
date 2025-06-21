// 6. Suitelet Migration with Validation

import * as serverWidget from 'N/ui/serverWidget';
import { EntryPoints } from 'N/types';
import * as log from 'N/log';

export const onRequest: EntryPoints.Suitelet.onRequest = context => {
  const form = serverWidget.createForm({ title: 'My Suitelet' });
  const input = form.addField({
    id: 'custpage_input',
    type: serverWidget.FieldType.TEXT,
    label: 'Enter something'
  });
  input.defaultValue = 'Default Text';

  if (context.request.method === 'POST') {
    const val = context.request.parameters.custpage_input;
    if (!val?.trim()) {
      form.addPageLink({ type: serverWidget.FormPageLinkType.CROSSLINK, title: 'Error', url: '#' });
    } else {
      log.debug({ title: 'User Input', details: val });
    }
  }

  context.response.writePage(form);
};