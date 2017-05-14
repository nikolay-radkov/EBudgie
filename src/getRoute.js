import React from 'react';

import Login from './containers/LoginContainer';
import Home from './containers/HomeContainer';
import Calendar from './containers/CalendarContainer';
import AddItem from './containers/Item/AddItemContainer';
import Items from './containers/Item/ItemsContainer';
import EditItem from './containers/Item/EditItemContainer';
import AddCategory from './containers/Category/AddCategoryContainer';
import Categories from './containers/Category/CategoriesContainer';
import EditCategory from './containers/Category/EditCategoryContainer';
import NotFound from './containers/NotFoundComponent';
import EditSalary from './containers/EditSalaryContainer';
import AddIncome from './containers/Event/AddIncomeContainer';
import AddExpense from './containers/Event/AddExpenseContainer';
import EditExpense from './containers/Event/EditExpenseContainer';
import EditIncome from './containers/Event/EditIncomeContainer';
import Reports from './containers/ReportsContainer';
import Settings from './containers/SettingsContainer';
import DetailedReport from './containers/Reports/DetailedReportContainer';
import ReportDownloader from './containers/ReportDownloaderContainer';
import AddThreshold from './containers/Threshold/AddThresholdContainer';
import Notificaitons from './containers/NotificationsContainer';
import Intro from './containers/IntroContainer';
import Spinner from './containers/Spinner';

const getRoutes = (key) => {
  let page;

  switch (key) {
    case 'scene_login':
      page = (<Login />);
      break;
    case 'scene_home':
      page = (<Home />);
      break;
    case 'scene_calendar':
      page = (<Calendar />);
      break;
    case 'scene_add_item':
      page = (<AddItem />);
      break;
    case 'scene_add_category':
      page = (<AddCategory />);
      break;
    case 'scene_edit_salary':
      page = (<EditSalary />);
      break;
    case 'scene_add_income':
      page = (<AddIncome />);
      break;
    case 'scene_add_expense':
      page = (<AddExpense />);
      break;
    case 'scene_reports':
      page = (<Reports />);
      break;
    case 'scene_settings':
      page = (<Settings />);
      break;
    case 'scene_detailed_report':
      page = (<DetailedReport />);
      break;
    case 'scene_report_downloader':
      page = (<ReportDownloader />);
      break;
    case 'scene_edit_expense':
      page = (<EditExpense />);
      break;
    case 'scene_edit_income':
      page = (<EditIncome />);
      break;
    case 'scene_categories':
      page = (<Categories />);
      break;
    case 'scene_edit_category':
      page = (<EditCategory />);
      break;
    case 'scene_items':
      page = (<Items />);
      break;
    case 'scene_edit_item':
      page = (<EditItem />);
      break;
    case 'scene_add_threshold':
      page = (<AddThreshold />);
      break;
    case 'scene_notifications':
      page = (<Notificaitons />);
      break;
    case 'scene_intro':
      page = (<Intro />);
      break;
    default:
      page = <NotFound />;
      break;
  }

  return (
    <Spinner>
      {page}
    </Spinner>
  );
};

export default getRoutes;
