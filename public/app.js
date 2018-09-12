
$(function() {

  // $.ajax('article.txt', {
  //   success: function(articleText) {
  //     $('body').append("<p>" + articleText + "</p>");
  //   }
  // });

  function getProductHTML(product) {
    return `<li><span>${product.name}</span> - <span>${product.price}</span></li>`
  }

  function renderProducts(products) {
    for (productId in products) {
      let product = products[productId];

      // 2. Create li element for each product
      let $li = getProductHTML(product)

      // let $li = $('<li>').addClass('test');
      // let $nameSpan = $('<span>').text(product.name);
      // let $dashSpan = $('<span>').text(' - ');
      // let $priceSpan = $('<span>').text(product.price);
      // $li.append($nameSpan);
      // $li.append($dashSpan);
      // $li.append($priceSpan);

      // 3. Append the li element to the ul
      $('ul#product-list').append($li);
    }
  }

  $.ajax('/products').done(renderProducts);

  $('form#new-product').on('submit', function(e) {
    e.preventDefault();

    // 1. Grab the content of the form
    let formData = $('form#new-product').serialize();

    // 2. Submit using ajax
    $.ajax('/products', {
      method: 'POST',
      data: formData
    }).then(function() {
      // 3. Clear the form
      $('form#new-product input').val('');
      $('ul').empty();

      // 4. Make sure the new product show up in the product list
      return $.ajax('/products');
    }).then(renderProducts);
  })

})