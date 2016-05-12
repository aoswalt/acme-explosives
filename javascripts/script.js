/* globals Acme */
'use strict';

(function() {
  function log(data) {
    console.log("data", data);
  }

  Acme.loadProducts(0, log);
}());
