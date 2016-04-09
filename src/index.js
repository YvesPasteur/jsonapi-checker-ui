'use strict';

var React = require('react');
var defaultApiHost = 'https://jsonapi-spec-validator-api.herokuapp.com';
var defaultApiUrl = defaultApiHost + '/validations';
//var defaultApiUrl = 'http://localhost:8080/validations';

var store = require('./store')(defaultApiHost);

var UserFields = require('./userFields');
var JSONPretty = require('./jsonPretty');
var ServerResponse = require('./serverResponse')(JSONPretty);
var Settings = require('./settings');
var RulesList = require('./rulesList');

var App = React.createClass({
  getInitialState: function() {
    return {
      Status: null,
      validation: {},
      error: {},
      apiUrl: defaultApiUrl,
      request: this.props.fields,
      rules: []
    };
  },
  componentDidMount: function() {
    store.loadAll('rules').subscribe((function(rules) {
      this.setState({rules: rules});
    }).bind(this));
  },
  handleUserValidation: function(value) {
    var req = this.state.request;

    if (value.header && value.header.contentType) {
      req.header.contentType = value.header.contentType;
    }
    if (value.body) {
      req.body = value.body;
    }
    if (value.method) {
      req.method = value.method;
    }

    if (! req.method) {
      delete req.method;
    }

    this.setState({request: req});

    var callback = function (res) {
      this.setState(
        {
          responseStatus: res.status ? res.status : '200',
          validation: res,
          error: {}
        }
      );
    }.bind(this);

    var errorCallback = function(error) {
      this.setState(
        {
          responseStatus: error.status,
          validation: {},
          error: error
        }
      );
    }.bind(this);

    store.create('validations', req)
      .subscribe(function(validation) {
        store.add(validation);
        callback(validation);
      }, function(rawError) {
        const payload = JSON.parse(rawError.xhr.response);
        const error = payload.errors[0];

        errorCallback(error);
      });
  },
  handleApiUrl: function(apiUrl) {
    this.setState({apiUrl: apiUrl});
  },
  render: function() {
    return (
      <div>
        <ul className="nav nav-tabs">
          <li role="presentation" className="active"><a href="#validationTab" data-toggle="tab">Validation</a></li>
          <li role="presentation"><a href="#rulesTab" data-toggle="tab">Rules</a></li>
          <li role="presentation"><a href="#aboutTab" data-toggle="tab">About</a></li>
        </ul>
        <div className="tab-content">
          <div role="tabpanel" className="tab-pane active" id="validationTab">
            <div className="container-fluid">
              <UserFields
                contentType={this.state.request.header.contentType}
                body={this.state.request.body}
                method={this.state.request.method}
                onFieldChange={this.handleFieldChange}
                onUserValidation={this.handleUserValidation}
              >
              </UserFields>
              <ServerResponse
                responseStatus={this.state.responseStatus}
                validation={this.state.validation}
                error={this.state.error}
                jsonBody={this.state.request.body}
              >
              </ServerResponse>
            </div>
            <div className="container-fluid">
              <Settings
                apiUrl={this.state.apiUrl}
                onApiUrlChange={this.handleApiUrl}>
              </Settings>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="rulesTab">
            <RulesList
              rules={this.state.rules}>
            </RulesList>
          </div>
          <div role="tabpanel" className="tab-pane" id="aboutTab">
            <div className="col-md-6">
              <h2>I don't know what is JSON API</h2>
              <p>I won't try to explain you, the official site will do the job : <a href="http://jsonapi.org/" target="_blank">http://jsonapi.org/</a></p>

              <h2>Where can I find the code of this validator ?</h2>
              <p>
                This validator is made from 3 parts :
                <ol>
                  <li>The UI is built on ReactJs and Bootstap, repository : https://github.com/YvesPasteur/jsonapi-spec-validator-ui</li>
                  <li>The Api Server is built on Hapi (NodeJs), repository : not coming soon</li>
                  <li>The validation library is built on Should (NodeJs), repository : coming soon</li>
                </ol>
              </p>

              <h2>How can I help ?</h2>
              <p>
                There are a lot of stuff which could be done on this project.<br/>
                You can report me bugs and documentation/English errors.
              </p>
              <p>
                The UI could be easily better, if you have some skills on this domain you can submit some PR on my UI project
                or start your own  !<br/>
                On the validation library, there is a major work in increasing the number of checked rules.<br/>
              </p>
              <p>
                This project is done on my free time.<br/>
                So any help is welcome !<br/>
                And if you think it is useful, the first help is to give me your feedback !
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

const fields ={
  header: {
    contentType: 'application/vnd.api+json'
  },
  method: '',
  body: JSON.stringify(
    {
      data:{
        id: 'jean',
        type: 'user'
      }
    },
    null,
    4
  )
};


React.render(
  <App fields={fields}></App>,
  document.getElementById('app')
);
