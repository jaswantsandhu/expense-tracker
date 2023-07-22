import request from 'supertest';
import express from 'express';
import { calculateBalance } from '@expense-tracker/helpers';
import PayoutsController from './PayoutsController';

jest.mock('@expense-tracker/helpers');

const app = express();
app.use(express.json());
app.use(PayoutsController);

describe('PayoutsController', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return calculated balances for given expenses', async () => {
    const mockExpenses = [
      { name: 'abc', amount: 100 },
      { name: 'def', amount: 50 },
    ];

    const mockBalances = {
      total: 150,
      equalShare: 75,
      payouts: [{ owes: 'def', owed: 'abc', amount: 25 }],
    };

    (calculateBalance as jest.Mock).mockReturnValue(mockBalances);

    const res = await request(app)
      .post('/')
      .send({ expenses: mockExpenses })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toEqual(mockBalances);
    expect(calculateBalance).toHaveBeenCalledWith(mockExpenses);
  });

  it('should return no payouts if spending is same.', async () => {
    const mockExpenses = [
      { name: 'abc', amount: 50 },
      { name: 'def', amount: 50 },
    ];

    const mockBalances = {
      total: 150,
      equalShare: 75,
      payouts: [],
    };

    (calculateBalance as jest.Mock).mockReturnValue(mockBalances);

    const res = await request(app)
      .post('/')
      .send({ expenses: mockExpenses })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toEqual(mockBalances);
    expect(calculateBalance).toHaveBeenCalledWith(mockExpenses);
  });

  it('should return no payouts if no expenses are sent.', async () => {
    const mockExpenses = [];

    const mockBalances = {
      total: 0,
      equalShare: 0,
      payouts: [],
    };

    (calculateBalance as jest.Mock).mockReturnValue(mockBalances);

    const res = await request(app)
      .post('/')
      .send({ expenses: mockExpenses })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toHaveProperty('error');
    expect(typeof res.body.error).toBe('string');
  });

  it('should return http error if body is empty.', async () => {
    const res = await request(app)
      .post('/')
      .send()
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body).toHaveProperty('error');
    expect(typeof res.body.error).toBe('string');
  });
});
