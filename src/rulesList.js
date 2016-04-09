var React = require('react');

var Rule = React.createClass({
  render: function() {
    return <div className="panel panel-default">
      <div className="panel-heading" role="tab" id="headingOne">
        <h4 className="panel-title">
          <a role="button" data-toggle="collapse" data-parent="#accordion" href={'#' + this.props.rule.id} aria-expanded="false" aria-controls={this.props.rule.id}>
            <span className={this.props.rule.checked ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-remove'}></span> {this.props.rule.id.split('-').join(' ')}
          </a>
        </h4>
      </div>
      <div id={this.props.rule.id} className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
        <div className="panel-body">
          <p className={this.props.rule.checked ? 'text-success' : 'text-danger'}>{this.props.rule.checked ? 'Checked' : 'Not checked'}</p>
          {this.props.rule.description}
        </div>
      </div>
    </div>;
  }
});

module.exports = React.createClass({
  render: function() {

    return <div className="col-md-6">
      <h2>Rules list</h2>
      <div className="panel panel-default">
        <div className="panel-body">
          This is the list of the rules defined in the JSON API specifications.<br/>
          All the rules are not checked by the validator, you can see the check state for each.<br/>
          You can click on the titles to see the whole description of the rule.
        </div>
      </div>
      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        {this.props.rules.map((rule) => <Rule rule={rule}></Rule>)}
      </div>
    </div>;
  }
});
