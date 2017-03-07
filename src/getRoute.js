import React from 'react';

import Login from './containers/LoginContainer';
import Home from './containers/HomeContainer';
import AddItem from './containers/AddItemContainer';
import AddCategory from './containers/AddCategoryContainer';
import NotFound from './containers/NotFoundComponent';
import EditSalary from './containers/EditSalaryContainer';
import AddIncome from './containers/AddIncomeContainer';
import AddExpense from './containers/AddExpenseContainer';
import EditExpense from './containers/EditExpenseContainer';
import Reports from './containers/ReportsContainer';
import Settings from './containers/SettingsContainer';
import DetailedReport from './containers/Reports/DetailedReportContainer';
import ReportDownloader from './containers/ReportDownloaderContainer';

export default (key, params) => {
  switch (key) {
    case 'scene_login':
      return (<Login />);
    case 'scene_home':
      return (<Home />);
    case 'scene_add_item':
      return (<AddItem />);
    case 'scene_add_category':
      return (<AddCategory />);
    case 'scene_edit_salary':
      return (<EditSalary />);
    case 'scene_add_income':
      return (<AddIncome />);
    case 'scene_add_expense':
      return (<AddExpense />);
    case 'scene_reports':
      return (<Reports />);
    case 'scene_settings':
      return (<Settings />);
    case 'scene_detailed_report':
      return (<DetailedReport />);
    case 'scene_report_downloader':
      return (<ReportDownloader />);
    case 'scene_edit_expense':
      return (<EditExpense />);
    default:
      return <NotFound />;
  }
};
