import { Router } from 'express';
import { Expense } from '@expense-tracker/data-model';
import { calculateBalance } from '@expense-tracker/helpers';
const PayoutsController = Router();

PayoutsController.post('/', (req, res) => {
  try {
    const expenses: Expense[] = req.body?.expenses;

    if (!expenses || !Array.isArray(expenses) || expenses.length === 0) {
      return res
        .status(400)
        .json({ error: 'Invalid or missing expenses data.' });
    }

    const balances = calculateBalance(expenses);
    res.json(balances);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

export default PayoutsController;
