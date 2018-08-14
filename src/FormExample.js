import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Form, Col, Checkbox, Button, Glyphicon, InputGroup, Radio} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class FormExample extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      firstName: '', 
      lastName: '', 
      age: '', 
      email: '', 
      phone: '',
      formValid: false,
      firstNameValid: false, lastNameValid: false, ageValid: false, emailValid: false, phoneValid: false,
      formErrors: {firstName: '', lastName: '', age: '', email: '', phone: ''},
      showModal: false
    };

  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name] : value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let firstNameValid = this.state.firstNameValid;
      let lastNameValid = this.state.lastNameValid;
      let ageValid = this.state.ageValid;
      let emailValid = this.state.emailValid;
      let phoneValid = this.state.phoneValid;
      value = value.replace(/^\s+|\s+$/gm,'');
      switch(fieldName) {
        case 'firstName':
          // this.nameValue = value;
          firstNameValid = value.match(/^([a-zA-Z ])*$/i) && value.length >=1;
          fieldValidationErrors.firstName = firstNameValid ? '': ' should contain only alphabets';
          break;
        case 'lastName':
          // this.nameValue = value;
          lastNameValid = value.match(/^([a-zA-Z ])*$/i) && value.length >=1;
          fieldValidationErrors.lastName = lastNameValid ? '': ' should contain only alphabets';
          break;
        case 'age':
          ageValid = value.match(/^([0-9])*$/i) && value.length >= 1;
          fieldValidationErrors.age = ageValid ? '': ' should contain only numbers';
          break;
        case 'email':
          emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.email = emailValid ? '' : ' should be of format <username>@<domain>.com eg:abc@abc.com';
        break;
        case 'phone':
          phoneValid = value.match(/^([0-9])*$/i) && value.length >= 1;
          fieldValidationErrors.phone = phoneValid ? '': 'should contain only numbers';
          break;
        default:
          break;
      }
      this.setState({formErrors: fieldValidationErrors,
        firstNameValid: firstNameValid, lastNameValid: lastNameValid, ageValid: ageValid, emailValid: emailValid, phoneValid: phoneValid
      }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.ageValid && this.state.emailValid && this.state.phoneValid});
  }

  handleSubmit = (evt) => {
      evt.preventDefault();
      fetch('http://ec2-18-219-164-234.us-east-2.compute.amazonaws.com/employees/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           firstname: this.state.firstName,
           lastname: this.state.lastName,
           age: this.state.age,
           emailaddress: this.state.email,
           contactno: this.state.phone
        }),
      })
      .then(response => {return response.text();})
      .then(text => console.log(text))
      // .then(this.setState({ firstName:'', lastName:'', email:'', age:'', phone:'' }))
      .then(alert('successfull insertion'))
      .then(window.location.replace('/#/'))
      .catch(error => {console.log('parsing failed', error);
                        alert('something went wrong!! please try again')
                      })
    }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="firstName">
          <ControlLabel>FirstName</ControlLabel>
          <FormControl type="text" name="firstName" value={this.state.firstName} onChange={this.handleUserInput}/>
          <FormControl.Feedback />
          <HelpBlock>{this.state.formErrors.firstName}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="lastName">
          <ControlLabel>LastName</ControlLabel>
          <FormControl type="text" name="lastName" value={this.state.lastName} onChange={this.handleUserInput}/>
          <FormControl.Feedback />
          <HelpBlock>{this.state.formErrors.lastName}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="age">
          <ControlLabel>Age</ControlLabel>
          <FormControl type="text" name="age" value={this.state.age} onChange={this.handleUserInput}/>
          <FormControl.Feedback />
          <HelpBlock>{this.state.formErrors.age}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl type="text" name="email" value={this.state.email} onChange={this.handleUserInput}/>
          <FormControl.Feedback />
          <HelpBlock>{this.state.formErrors.email}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="phone">
          <ControlLabel>Phone</ControlLabel>
          <FormControl type="text" name="phone" value={this.state.phone} onChange={this.handleUserInput}/>
          <FormControl.Feedback />
          <HelpBlock>{this.state.formErrors.phone}</HelpBlock>
        </FormGroup>
        <Button type="submit" disabled={!this.state.formValid} >Submit</Button>
      </form>
      <br/>
      <p><Link to={'/'} className="btn btn-default" >List of Employees</Link></p>
      </div>
    );
  }
}

export default FormExample;
