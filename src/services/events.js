import moment from 'moment';
import _ from 'lodash';

import DefaultCategories from '../constants/DefaultCategories';
import { mapReportForDownload } from './mapIdToObject';

export const filterEventsForRange = (ebudgie, from, to) => {
  const incomes = _.filter(ebudgie.incomes, (income) => {
    return moment(from) <= moment(income.date) && moment(income.date) <= moment(to);
  });

  const expenses = _.filter(ebudgie.expenses, (expense) => {
    return moment(from) <= moment(expense.date) && moment(expense.date) <= moment(to);
  });

  return {
    incomes,
    expenses
  };
};

export const getReportForRange = (ebudgie, from, to, salary) => {
  const { incomes, expenses } = filterEventsForRange(ebudgie, from, to);

  const incomeSum = _.sumBy(incomes, 'value');
  const expenseSum = _.sumBy(expenses, 'value');

  const report = {
    incomeSum,
    expenseSum,
    result: salary.value + incomeSum + expenseSum,
    date: from,
  };

  return report;
};

export const getPastReports = (ebudgie, salaries) => {
  const now = moment();
  let firstIncome = now;

  for (let i = 0; i < ebudgie.incomes.length; i++) {
    firstIncome = moment.min(firstIncome, moment(ebudgie.incomes[i].date));
  }

  let firstExpense = moment();

  for (let i = 0; i < ebudgie.expenses.length; i++) {
    firstExpense = moment.min(firstExpense, moment(ebudgie.expenses[i].date));
  }

  let current = moment.min(firstExpense, firstIncome);

  const reports = [];

  while (current < now.startOf('month')) {
    const start = moment(current).startOf('month');
    const end = moment(current).endOf('month');
    let salary = _.findLast(salaries, (s) => {
      return start < moment(s.date) && moment(s.date) < end;
    });

    salary = _.first(salaries) || 0;

    reports.push(getReportForRange(
      ebudgie,
      start,
      end,
      salary));

    current = current.add(1, 'months');
  }

  return _.orderBy(reports, 'date', 'desc');
};

export const getMonthReportForCategories = (ebudgie, from, to) => {
  const { incomes, expenses } = filterEventsForRange(ebudgie, from, to);

  let incomesCategories = _.chain(incomes)
    .map((el) => {
      return {
        ...el,
        category: _.find(ebudgie.categories, (c) => c.id === el.categoryId).title,
      };
    })
    .groupBy('category')
    .value();

  let expensesCategories = _.chain(expenses)
    .map((el) => {
      return {
        ...el,
        category: _.find(ebudgie.categories, (c) => c.id === el.categoryId).title,
      };
    })
    .groupBy('category')
    .value();

  const result = {
    incomes: [],
    expenses: [],
  };

  for (let i in incomesCategories) {
    result.incomes.push({
      category: i,
      value: _.sumBy(incomesCategories[i], 'value'),
    });

    if (!expensesCategories.hasOwnProperty(i)) {
      result.expenses.push({
        category: i,
        value: 0,
      });
    }
  }

  for (let i in expensesCategories) {
    result.expenses.push({
      category: i,
      value: Math.abs(_.sumBy(expensesCategories[i], 'value')),
    });

    if (!incomesCategories.hasOwnProperty(i)) {
      result.incomes.push({
        category: i,
        value: 0,
      });
    }
  }

  switch (result.expenses.length) {
    case 0:
      result.expenses.push(DefaultCategories[0]);
      result.expenses.push(DefaultCategories[1]);
      result.expenses.push(DefaultCategories[2]);
      result.incomes.push(DefaultCategories[0]);
      result.incomes.push(DefaultCategories[1]);
      result.incomes.push(DefaultCategories[2]);
      break;
    case 1:
      result.expenses.push(DefaultCategories[0]);
      result.expenses.push(DefaultCategories[1]);
      result.incomes.push(DefaultCategories[0]);
      result.incomes.push(DefaultCategories[1]);
      break;
    case 2:
      result.expenses.push(DefaultCategories[0]);
      result.incomes.push(DefaultCategories[0]);
      break;
  }

  return result;
};

export const getMonthReportForDays = (ebudgie, from, to) => {
  const result = {
    days: [],
    values: []
  };

  let currentDate = moment(from);

  const daysBetween = Math.abs(moment(from).diff(moment(to), 'days'));

  let i = 0;
  do {
    let date = moment(currentDate);
    let dayStart = moment(date.startOf('date'));
    let dayEnd = moment(date.endOf('date'));
    let filteredData = filterEventsForRange(ebudgie, dayStart, dayEnd);
    const incomeSum = _.sumBy(filteredData.incomes, 'value') || 0;
    const expenseSum = _.sumBy(filteredData.expenses, 'value') || 0;

    result.values.push([incomeSum, expenseSum]);
    result.days.push(currentDate.format('DD MMM'));
    currentDate.add(1, 'days');
    i++;
  } while (i <= daysBetween);

  return result;
};

export const getReportForDownload = (ebudgie, from, to) => {
  const { incomes, expenses } = filterEventsForRange(ebudgie, from, to);

  let mappedIncomes = _.map(incomes, (i) => mapReportForDownload(ebudgie.categories, ebudgie.items, i));
  let mappedExpenses = _.map(expenses, (i) => mapReportForDownload(ebudgie.categories, ebudgie.items, i));

  return {
    incomes: mappedIncomes,
    expenses: mappedExpenses,
  };
};
