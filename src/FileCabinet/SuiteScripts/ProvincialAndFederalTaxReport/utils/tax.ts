export function calculateTax(brackets: { threshold: number, rate: number }[], salary: number): number {
    let tax = 0;
    let previousThreshold = 0;

    for (const { threshold, rate } of brackets) {
        if (salary <= threshold) {
            tax += (salary - previousThreshold) * rate;
            return parseFloat(tax.toFixed(2));
        }

        tax += (threshold - previousThreshold) * rate;
        previousThreshold = threshold;
    }

    const lastRate = brackets[brackets.length - 1].rate;
    tax += (salary - previousThreshold) * lastRate;

    return parseFloat(tax.toFixed(2));
}