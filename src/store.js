var Store = require('json-api-store');

module.exports = function(baseUrl) {
  // Create a new store instance.
  var adapter = new Store.AjaxAdapter({ base: baseUrl });
  var store = new Store(adapter);

  store.define([ "validations", "validation" ], {
    response: Store.attr(),
    error: Store.attr(),
    path: Store.attr(),
    header: Store.attr(),
    method: Store.attr(),
    body: Store.attr(),
    rules: Store.hasMany()
  });

  store.define([ "rules", "rule" ], {
    description: Store.attr(),
    requirementLevel: Store.attr(),
    checked: Store.attr()
  });

  return store;
};
