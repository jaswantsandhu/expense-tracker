import { Expense, PayoutsResponse } from '@expense-tracker/data-model';

export function calculateBalance(expenses: Expense[]): PayoutsResponse {
    const groupExpenses: Record<string, number> = expenses.reduce((accu, curr) => {
        return {
            ...accu,
            [curr.name]: (accu[curr.name] || 0) + curr.amount,
        };
    }, {});

    const totalExpense = Object.values(groupExpenses).reduce((sum, curr) => sum + curr, 0);
    const averageExpense = totalExpense / Object.keys(groupExpenses).length;

    const balances: Record<string, number> = {};

    for (const [name, amount] of Object.entries(groupExpenses)) {
        balances[name] = amount - averageExpense;
    }

    const sortedBalances = Object.entries(balances).sort((a, b) => b[1] - a[1]);

    const payouts = [];
    
    let payerIndex = 0;
    let receiverIndex = sortedBalances.length - 1;

    while (payerIndex < receiverIndex) {
        const payer = sortedBalances[payerIndex];
        const receiver = sortedBalances[receiverIndex];

        if (payer[1] === 0) {
            payerIndex++;
            continue;
        }
        if (receiver[1] === 0) {
            receiverIndex--;
            continue;
        }

        const amountToSettle = Math.min(payer[1], Math.abs(receiver[1]));

        payouts.push({
            owes: receiver[0], 
            owed: payer[0], 
            amount: amountToSettle
        });

        sortedBalances[payerIndex][1] -= amountToSettle;
        sortedBalances[receiverIndex][1] += amountToSettle;
    }

    return {
        total: totalExpense,
        equalShare: averageExpense,
        payouts: payouts
    };
}
