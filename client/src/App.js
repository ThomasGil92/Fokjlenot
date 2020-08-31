import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import AdminRoutes from "./AdminRoute"
import Landing from "./components/Landing"
import Confirm from './components/Confirm'
import ContactFormPage from './components/ContactPage/ContactFormPage'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Legal from './components/Legal';


function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/signin" component={Signin} />     
      <Route exact path="/signup" component={Signup} />     
      <Route exact path="/landing" component={Landing} />   
      <Route exact path="/contact" component={ContactFormPage} />   
      <Route exact path="/legal" component={Legal} />  
      <Route exact path='/confirm/:id' component={Confirm} />
      <Route exact path='/forgot-password' component={ForgotPassword} />
      <Route exact path='/reset-password/:forgotId' component={ResetPassword} />
      <AdminRoutes/>
      
    </Switch>
    </Router>
  );
}

export default App;
