(function (window) {
  "use strict";
  var FORM_SELECTOR = "[data-coffee-order=\"form\"]";
  var CHECKLIST_SELECTOR = "[data-coffee-order=\"checklist\"]";
  //var SERVER_URL = "http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders";
  var SERVER_URL = "http://localhost:2403/coffeeorders"; //locate: user/htngu/deloyd/
  //var PAYMENT_SELETOR = '[data-coffee-payment="payment"]';
  var App = window.App;
  var Truck = App.Truck;
  //var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var RemoteDataStore = App.RemoteDataStore; // replace DataStore
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck("ncc-1701", remoteDS);
  window.myTruck = myTruck; // export it as global namespace

  // bind requires you to have a reference to the intended owner of the invocation
  // – a reference that must be available outside of the method body.
  // formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  // console.log(formHandler);

  // define CheckList object in checklist.js
  var CheckList = App.CheckList;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function (data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);

  // hw 4: order store in Deployd persist after refreshing the page
  remoteDS.getAll();

})(window);
