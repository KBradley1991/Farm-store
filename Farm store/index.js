const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceOverview = require('./modules/replaceOverview');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const overviewHtml = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const productHtml = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);
const cardHtml = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

//create a server
const server = http.createServer((req, res) => {
  const pathName = req.url;
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === '/' || pathname === '/overview') {
    //creating the card html
    const cardDetail = dataObj
      .map(product => replaceOverview(cardHtml, product))
      .join('');

    //creating overview page
    let finalOverviewHtml = overviewHtml;
    finalOverviewHtml = finalOverviewHtml.replace(
      /{%PRODUCT_CARD%}/g,
      cardDetail
    );

    //sending the html
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    res.end(finalOverviewHtml);
    //display product detail page route
  } else if (pathname === '/product') {
    //display product detail page
    const productDetailpage = replaceOverview(productHtml, dataObj[query.id]);
    res.writeHead('200', {
      'Content-type': 'text/html'
    });
    console.log(query);
    res.end(productDetailpage);
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'My-own-header': 'Hello World'
    });
    res.end('404 - page not found');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening from port 8000');
});
