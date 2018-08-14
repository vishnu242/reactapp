import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

//const data = [{ title: 'Conan the Barbarian', year: '1982' }];
const columns = [
  {
    name: 'Employee Id',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'First Name',
    selector: 'firstname',
    sortable: true
  },
  {
    name: 'Last Name',
    selector: 'lastname',
    sortable: true
  },
  {
    name: 'Age',
    selector: 'age',
    sortable: true
  },
  {
    name: 'Phone Number',
    selector: 'contactno',
    sortable: true,
    right: true,
  }
];

const API = 'http://ec2-18-219-164-234.us-east-2.compute.amazonaws.com/employees';
class Table extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          employees: [],
        };
      }
    
      componentDidMount() {
        fetch(API)
          .then(response => response.json())
          .then(data => this.setState({ employees: data }));
      }
  render() {
    return (
      <div>
        <br/>
        <p><Link to={'/addEmployee'} className="btn btn-default" >Add Employee</Link></p>
        <br/>
        <DataTable
            title="Employees Data"
            columns={columns}
            data={this.state.employees}
        />
      </div>
    )
  }
}

export default Table;
