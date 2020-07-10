import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

import TransactionRepository from '../repositories/TransactionsRepository';

export type TransactionType = 'income' | 'outcome';

interface Request {
  title: string;
  value: number;
  type: TransactionType;
  categoryTitle: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    categoryTitle,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionRepository);
    const categoriesRepository = getRepository(Category);

    if (type === 'outcome') {
      const balance = await transactionsRepository.getBalance();
      if (balance.total < value) {
        throw new AppError('This outcome is bigger than you can pay!');
      }
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
    });

    let category = await categoriesRepository.findOne({
      where: { title: categoryTitle },
    });

    if (!category) {
      category = categoriesRepository.create({
        title: categoryTitle,
      });
      await categoriesRepository.save(category);
    }

    transaction.category_id = category?.id;

    await transactionsRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
