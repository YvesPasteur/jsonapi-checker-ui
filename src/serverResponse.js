var React = require('react');

module.exports = function(JSONPretty) {
  var Message = React.createClass({
    render: function() {
      return <li>{this.props.rule.description}</li>;
    }
  });

  var MessageList = React.createClass({
    render: function() {
      if (this.props.validation.rules && this.props.validation.rules.length > 0) {
        return <div className="panel panel-default">
          <div className="panel-body bg-danger">
            <ol>
            {this.props.validation.rules.reverse().map((rule) => <Message rule={rule}></Message>)}
            </ol>
          </div>
        </div>;
      }

      if (this.props.validation.error) {
        return <div className="panel panel-default">
          <div className="panel-body bg-danger">
            <ol>
            <Message rule={{description: this.props.validation.error}}></Message>
            </ol>
          </div>
        </div>;
      }

      return <div className="panel panel-default">
        <div className="panel-body bg-success">
          Well done !
        </div>
      </div>;
    }
  });

  return React.createClass({
    getStatusLevel: function(httpStatus) {
      if (httpStatus === null) {
        return 'info';
      }
      if (httpStatus >= 200 && httpStatus < 300) {
        return 'success';
      }
      if (httpStatus >= 300 && httpStatus < 400) {
        return 'warning';
      }

      return 'danger';
    },
    formatPath: function(validation) {
      if(validation.path) {
        return JSON.stringify(validation.path);
      }
    },
    render: function() {
      return <div className="col-md-6">
        <h2>The server validation</h2>
        <form>
          <div className="form-group">
            <label id="responseStatusField" className={"text-" + this.getStatusLevel(this.props.responseStatus)}>Status</label>
            <input
              type="text"
              id="responseStatusField"
              value={this.props.responseStatus}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <MessageList validation={this.props.validation}></MessageList>
          </div>
          <div className="form-group">
            <label htmlFor="pathField">Path</label>
            <input
              type="text"
              id="pathField"
              value={this.formatPath(this.props.validation)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="jsonField">Body</label>
            <JSONPretty
              id="json-pretty"
              json={this.props.jsonBody}
              errorPath={this.props.validation ? this.props.validation.path : ''}
            >
            </JSONPretty>
          </div>
        </form>
      </div>;
    }
  });
};
