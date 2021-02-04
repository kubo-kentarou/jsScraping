const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const scrape = async () => {
  //UCCのカフェインと入っている商品を持ってくる
  const res = await fetch("https://www.ucc.co.jp/product/regular/index.html");
  const html = await res.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  // ここから変える↓
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

  // ここから名前にカフェインと入っているものに絞ります。
  const caffein = UCC.filter((ucc) => {
    return ucc.includes("カフェイン");
  });
  console.log(caffein);
};

const scrape1 = async () => {
  //suumoの値段を取ってくる
  const res = await fetch(
    "https://suumo.jp/jj/chintai/ichiran/FR301FC001/?ar=030&bs=040&ra=013&rn=0305&ek=030506640&et=15&sngz=&po1=09"
  );
  const html = await res.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  // ここから変える↓
  const nodes = document.querySelectorAll(
    ".cassetteitem_other .cassetteitem_other-emphasis" //建物の値段
  );

  const nodesHref = document.querySelectorAll(
    ".cassetteitem_other .cassetteitem_other-linktext" //詳細を見るのリンク
  );

  const nodesTr = document.querySelectorAll(
    "tr.js-cassette_link" //trごとに取得
  );

  // const price = Array.from(nodes).map((td) => td.textContent.trim());
  // const link = Array.from(nodesHref).map((td) => td.href.trim());

  Array.from(nodesTr).map((td) => {
    const price = td.querySelector(
      ".cassetteitem_other .cassetteitem_other-emphasis"
    );
    const link = td.querySelector(
      ".cassetteitem_other .cassetteitem_other-linktext"
    );
    if (price.textContent.trim() === "8.5万円") {
      console.log(price.textContent.trim(), "suumo.jp" + link.href.trim());
    }
  });

  // const intprice = price.map((val) => {
  //   return +val.replace("万円", "");
  // });

  // 値段の昇順ソートしました。
  // const compareFunc = (a, b) => {
  //   return a - b;
  // };

  // console.log(intprice.sort(compareFunc));
};

const scrape2 = async () => {
  const res = await fetch("https://www.jma.go.jp/jp/week/319.html");
  const html = await res.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const tdTableTextNodes = document.querySelectorAll("#explain tr");
  Array.from(tdTableTextNodes).map((td) => {
    const sinraidoNode = td.firstElementChild;
    const tableTextNode = td.querySelector(".tabletext b");
    if (tableTextNode && sinraidoNode) {
      console.log(
        sinraidoNode.innerHTML.trim(),
        tableTextNode.innerHTML.trim()
      );
    }
  });
};

scrape1();
