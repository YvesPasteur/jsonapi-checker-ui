var React = require('react');

var mapObject = function(object, callback) {
  var currentIndex = 0;
  const keys = Object.keys(object);

  return keys.map(function (key) {
    var isLast = (currentIndex === keys.length - 1);
    currentIndex++;

    return callback(key, object[key], isLast);
  });
};

var JsonLeaf = React.createClass({
  render: function() {
    return <span className="json-leaf">{this.props.value}</span>;
  }
});

var JsonKey = React.createClass({
  render: function() {
    return <span className="json-key">"{this.props.value}":</span>
  }
});

var JsonChild = React.createClass({
  render: function() {
    if (Array.isArray(this.props.value)) {
      return <JsonArray
        value={this.props.value}
        parentPath={this.props.parentPath}
        errorPath={this.props.errorPath}
        addTrailingComma={this.props.addTrailingComma}
      >
      </JsonArray>;
    }

    if (typeof this.props.value === 'object') {
      return <JsonObject
        value={this.props.value}
        parentPath={this.props.parentPath}
        errorPath={this.props.errorPath}
        addTrailingComma={this.props.addTrailingComma}
      >
      </JsonObject>;
    }

    return <JsonLeaf value={this.props.value}></JsonLeaf>;
  }
});

var JsonObject = React.createClass({
  render: function() {
    return <div className="json-object">{'{'}
        {mapObject(
          this.props.value, (key, value, isLast) => {
            const path = (this.props.parentPath ? this.props.parentPath + '.' : '') + key;
            const style = {
              paddingLeft: '1em'
            };

            return <div
              style={style}
              id={'json-' + path}
              className={(path === this.props.errorPath) ? 'bg-danger' : ''}>
              <JsonKey value={key}></JsonKey>
              <JsonChild
                value={value}
                parentPath={path}
                errorPath={this.props.errorPath}
                addTrailingComma={!isLast}
              >
              </JsonChild>
            </div>
      })}
        {'}'}{this.props.addTrailingComma ? ',' : ''}
      </div>
  }
});

var JsonArray = React.createClass({
  render: function() {
    var formatChildren = function(children) {
      return children.map(((value, index, array) => {
        var path = this.props.parentPath + '[' + index + ']';
        const style = {
          paddingLeft: '1em'
        };

        return <div
          style={style}
          id={'json-' + path}
          className={(path === this.props.errorPath) ? 'bg-danger' : ''}>
          <JsonChild
            value={value}
            parentPath={path}
            errorPath={this.props.errorPath}
            addTrailingComma={index !== array.length -1 }
          >
          </JsonChild>
        </div>;
      }).bind(this))
    }.bind(this);

    return <div className="json-array"> [
        {formatChildren(this.props.value)}
      ]{this.props.addTrailingComma ? ',' : ''}
    </div>;
  }
});

var JSONPretty = React.createClass({
  render: function () {
    var json = this.props.json;

    if (typeof json === 'string') {
      try {
        json = JSON.parse(json);
      }
      catch (e) {
        console.error("The string is not a valid json data!", e);
      }
    }

    return <pre>
      <JsonObject
        value={json}
        parentPath={''}
        errorPath={this.props.errorPath}
      >
      </JsonObject>
    </pre>;
  }
});

module.exports = JSONPretty;
