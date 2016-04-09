'use strict';

var React = require('react');
var brace = require('brace');
var AceEditor = require('react-ace');
var debounce = require('throttle-debounce').debounce;

require('brace/mode/json');
require('brace/theme/github');

var UserFields = React.createClass({
  componentWillMount: function() {
    this.handleChange = debounce(1000, this.handleChange);
  },
  handleChange: function(value) {
    this.props.onUserValidation(value);
  },
  handleContentTypeChange: function(e) {
    this.handleChange(
      {
        header: {
          contentType: e.target.value.trim()
        }
      }
    );
  },
  handleBodyChange: function(value) {
    this.handleChange({body: value});
  },
  handleMethodChange: function(e) {
    this.handleChange({method: e.target.value.trim()});
  },
  render: function() {
    return <div className="col-md-6">
      <h2>Your inputs</h2>
      <form>
        <div className="form-group">
          <label htmlFor="contentTypeField">Content-type</label>
          <input
            type="text"
            id="contentTypeField"
            value={this.props.contentType}
            onChange={this.handleContentTypeChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="methodField">Method</label>
          <select
            id="methodField"
            value={this.props.method}
            onChange={this.handleMethodChange}
            className="form-control"
          >
            <option value=""></option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="bodyField">Body</label>

          <AceEditor
            value={this.props.body}
            mode="json"
            theme="github"
            onChange={this.handleBodyChange}
            name="bodyField"
            className="form-control"
            editorProps={{$blockScrolling: false}}
            width="100%"
            showPrintMargin={false}
          />
        </div>
      </form>
    </div>
  }
});

module.exports = UserFields;
