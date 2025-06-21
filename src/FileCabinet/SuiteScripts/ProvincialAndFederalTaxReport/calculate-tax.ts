import * as record from 'N/record';
import { calculateTax } from './utils/tax';

function getBrackets(region: string, year: number): { threshold: number, rate: number }[] {
    if (region === 'F') return [
        { threshold: 32000, rate: 0.226 },
        { threshold: 55800, rate: 0.32 },
        { threshold: 120000, rate: 0.45 }
    ];
    if (region === 'AB') return [
        { threshold: 32000, rate: 0.2 },
        { threshold: 65000, rate: 0.3 },
        { threshold: 115000, rate: 0.395 }
    ];
    if (region === 'MB') return [
        { threshold: 15600, rate: 0.18 },
        { threshold: 30000, rate: 0.2 },
        { threshold: 55000, rate: 0.3 },
        { threshold: 110000, rate: 0.45 }
    ];
    if (region === 'ON') return [
        { threshold: 32000, rate: 0.226 },
        { threshold: 55800, rate: 0.32 },
        { threshold: 120000, rate: 0.45 }
    ];
    return [];
}

export function processEmployee(employeeId: string, year: number) {
    const emp = record.load({ type: record.Type.EMPLOYEE, id: employeeId });
    const salary = parseFloat(emp.getValue('custentity_payroll_base_salary') as string);
    const province = emp.getValue('custentity_province') as string;

    const federalBrackets = getBrackets('F', year);
    const provincialBrackets = getBrackets(province, year);

    const federalTax = calculateTax(federalBrackets, salary);
    const provincialTax = calculateTax(provincialBrackets, salary);

    emp.setValue({ fieldId: 'custentity_federal_tax_paid', value: federalTax });
    emp.setValue({ fieldId: 'custentity_provincial_tax_paid', value: provincialTax });
    emp.save();

    return { federalTax, provincialTax };
}
