'use strict';

var React = require('react');

module.exports = React.createClass({
  handleApiUrlChange: function(e) {
    this.props.onApiUrlChange(e.target.value.trim());
  },
  render: function() {
    return <div className="col-md-6">
      <h2>Settings</h2>
      <form>
        <label htmlFor="apiUrlField">API Url</label>
        <input
          type="texte"
          id="apiUrlField"
          value={this.props.apiUrl}
          className="form-control"
          onChange={this.handleApiUrlChange}
        />
      </form>
    </div>;
  }
});
