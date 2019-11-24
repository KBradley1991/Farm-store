module.exports = (cardHtml, product) => {
  let productOutput = cardHtml;
  let organicValue;
  const organicDiv =
    '<div class="card__detail-box"> <h6 class="card__detail card__detail--organic">Organic!</h6></div>';
  product.organic === true
    ? (organicValue = ".card__detail--organic")
    : (organicValue = ".not-organic");

  productOutput = productOutput.replace(/{%IMAGE%}/g, product.image);
  productOutput = productOutput.replace(
    /{%PRODUCTNAME%}/g,
    product.productName
  );
  productOutput = productOutput.replace(/{%QUANTITY%}/g, product.quantity);
  productOutput = productOutput.replace(/{%PRICE%}/g, product.price);
  productOutput = productOutput.replace(/{%ID%}/g, product.id);
  productOutput = productOutput.replace(/{%NOT_ORGANIC%}/g, organicValue);
  productOutput = productOutput.replace(/{%NUTRIENTS%}/g, product.nutrients);
  productOutput = productOutput.replace(/{%FROM%}/g, product.from);
  productOutput = productOutput.replace(
    /{%DESCERIPTION%}/g,
    product.description
  );
  if (product.organic) {
    productOutput = productOutput.replace(/{%ORGANIC%}/g, organicDiv);
  } else {
    productOutput = productOutput.replace(/{%ORGANIC%}/g, " ");
  }

  return productOutput;
};
