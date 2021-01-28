const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const scrape = async () => {
  //   const res = await fetch("https://www.jma.go.jp/jp/week/319.html"); //すべてHTMLでくる
  const res = await fetch("https://www.ucc.co.jp/product/regular/index.html");
  const html = await res.text(); //なのでテキスト化させる
  const dom = new JSDOM(html);
  const document = dom.window.document;
  // ここから変える↓
  //   const nodes = document.querySelectorAll("#infotablefont tr:nth-child(8) td");
  const nodes = document.querySelectorAll("ul.ucc-m-product-thumbs__list li");
  const tokyoWeathers = Array.from(nodes).map((td) => td.textContent.trim());
  //メニュー名の\nを消しました。
  const UCC = tokyoWeathers.map((el) => {
    if (el.indexOf(/\n/g)) {
      return el.replace(/\n/g, "");
    } else {
      return el;
    }
  });
  console.log(UCC);
};
scrape();
