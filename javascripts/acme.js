'use strict';

var Acme = (function(acme) {
  function fetchCategories(selectedId) {
    return new Promise(function(resolve, reject) {
      $.ajax("/data/categories.json")
        .done(data => resolve(data.categories.filter(e => e.id === selectedId)[0]))
        .fail((x,s,e) => reject(e));
    });
  }

  function fetchTypes(categoryId) {
    return new Promise(function(resolve, reject) {
      $.ajax("/data/types.json")
        .done(data => resolve(data.types.filter(e => e.category === categoryId)))
        .fail((x,s,e) => reject(e));
    });
  }

  function fetchProducts(typeArray) {
    return new Promise(function(resolve, reject) {
      $.ajax("/data/products.json")
        .done(data => {
          let typeIds = typeArray.map(t => t.id);
          resolve(data.products.filter(e => typeIds.indexOf(e[Object.keys(e)[0]].type) > -1));
        })
        .fail((x,s,e) => reject(e));
    });
  }

  acme.loadProducts = function(selectedId, callback) {
    var category = {};
    var types = [];
    var products = [];

    return fetchCategories(selectedId).then(function(data) {
      console.log("cat data", data);
      category = data;
      return fetchTypes(category.id);
    }).then(function(data) {
      console.log("type data", data);
      types = data;
      return fetchProducts(types);
    }).then(function(data) {
      console.log("prod data", data);
      products = data;
      return callback({ category, types, products });
    });
  };

  return acme;
}(Acme || {}));
