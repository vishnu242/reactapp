import React, { Component } from 'react';
import EmployeeForm from './FormExample';
import Table from './Table';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
            <Switch>
              {/* <Route exact path='/' component={Home} /> */}
              <Route exact path='/addEmployee' component={EmployeeForm} />
              <Route exact path='/' component={Table} />
            </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
