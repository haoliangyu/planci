export function calculateMonthlyPayment(amount, term) {
  if (amount && term) {
    const monthlyBase = parseFloat(amount) / parseInt(term);
    const monthlyFee = monthlyBase * 0.0133;
    const monthlyPayment = monthlyBase + monthlyFee;
    const totalPayment = monthlyPayment * parseInt(term);
    const totalFee = monthlyFee * parseInt(term);
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      monthlyFee: monthlyFee.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalFee: totalFee.toFixed(2),
    };
  }
  return null;
}
