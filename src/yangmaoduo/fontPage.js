const cheerio = require("cheerio");
const fs = require('fs')
const Spider = require("../lib/spiderD");


const config = require("../config");

const {guid} = require('../util/tool')

let startUrl = config.yangmaodaoUrl;
const lastDay = config.yangmaoduoData;
let lastDate = new Date(lastDay).valueOf();

async function spiderHtml(startUrl){
    console.log("url::: " + startUrl);
    let sp = new Spider();
    let htmlStr = await sp.getHtml(url);

    let $ = cheerio.load(htmlStr);
}