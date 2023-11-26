// src/AppRouter.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch,useHistory } from 'react-router-dom';
import Header from '../Components/Header/Header';
import OrderManagementPage from '../Pages/OrderManagement/OrderManagement';
import CustomerManagement from '../Pages/CustomerManagement/CustomerManagement';
import LoginPage from '../Pages/Login/Login';

const AppRouter = () => {

  return (
    <Router>
    <Header />
      <Switch>
        <Route path="/orders" component={OrderManagementPage} />
        <Route path="/customer" component={CustomerManagement} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;