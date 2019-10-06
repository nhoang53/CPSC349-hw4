(function (window) {
  "use strict";
  var App = window.App || {};

  var $ = window.jQuery;
  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function (key, val) {
    // Code will go here
    $.post(this.serverUrl, val, function (serverResponse){
      console.log(serverResponse);
    });
  };

  //retrieves all orders and passes them to callback cb
  RemoteDataStore.prototype.getAll = function(cb){
    $.get(this.serverUrl, function (serverResponse){
      console.log(serverResponse);
      cb = serverResponse;
      var CHECKLIST_SELECTOR = "[data-coffee-order=\"checklist\"]";
      var CheckList = App.CheckList;
      var checkList = new CheckList(CHECKLIST_SELECTOR);
      cb.forEach(function(orders){
        checkList.addRow(orders);
      });
      //return serverResponse;
    });
  };

  //retrieves a single coffee Order
  RemoteDataStore.prototype.get = function(key, cb){
    $.get(this.serverUrl + "/" + key, function (serverResponse){
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  // remove a single order using email
  RemoteDataStore.prototype.remove = function(key){
    var data = [[]];
    var url = this.serverUrl;
    $.get(this.serverUrl + "?emailAddress=" + key, function (serverResponse)
    {
      data = serverResponse;
      var id = data[0]["id"];
      $.ajax(url + "/" + id, {
        type: "DELETE"
      });
      console.log("Order for " + key +" removed");
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
