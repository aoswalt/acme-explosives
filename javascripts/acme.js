'use strict';

var Acme = (function(acme) {
  function fetchCategories(selectedId) {
    return new Promise(function(resolve, reject) {
      $.ajax("/data/categories.json")
        //NOTE(adam): resolve with the single category matching the selectedId
        .done(data => resolve(data.categories.filter(e => e.id === selectedId)[0]))
        .fail((x,s,e) => reject(e));
    });
  }

  function fetchTypes(categoryId) {
    return new Promise(function(resolve, reject) {
      $.ajax("/data/types.json")
        //NOTE(adam): resolve with the list of types that match the categoryId
        .done(data => resolve(data.types.filter(e => e.category === categoryId)))
        .fail((x,s,e) => reject(e));
    });
  }

  function fetchProducts(typeArray) {
    return new Promise(function(resolve, reject) {
      $.ajax("/data/products.json")
        .done(data => {
          //NOTE(adam): resolve with the list of products matching any type in typeArray
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

    fetchCategories(selectedId).then(function(data) {
      category = data;
      return fetchTypes(category.id);
    }).then(function(data) {
      types = data;
      return fetchProducts(types);
    }).then(function(data) {
      products = data;
      callback({ category, types, products });
    });
  };

  return acme;
}(Acme || {}));
