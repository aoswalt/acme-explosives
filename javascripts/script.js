/* globals Acme */
'use strict';

(function() {
  let $categorySelect = $("#category");
  let $content = $("#content");

  $.ajax("/data/categories.json").done(function(data) {
    data.categories.forEach((e) =>
      $categorySelect.append(`<option value="${e.id}">${e.name}</option>`));
  });

  function display(data) {
    let html = `<h1>${data.category.name}</h1>`;
    let prods = data.products.map(p => p[Object.keys(p)[0]]);
    console.log("prods", prods);
    console.log("data.types", data.types);
    prods.forEach(p => p.typeName = data.types.filter(t => t.id === p.type)[0].name);
    prods.forEach(p => html += `
      <h2>${p.name}</h2>
      <p>${p.typeName}</p>
      <p>${p.description}</p>
      `);

    $content.html(html);
  }

  $categorySelect.click(e => Acme.loadProducts(parseInt(e.target.value), display));
  Acme.loadProducts(0, display);
}());
