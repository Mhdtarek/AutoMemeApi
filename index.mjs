import express from 'express';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'

let requestCount = 0;
let totalDuration = 0;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();


function getRandomInt() {
  return Math.floor(Math.random() * 10000);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

app.get('/getAiMeme', async (req, res) => {
  requestCount++;
  const startTime = new Date().getTime();

  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  const url = "https://imgflip.com/ai-meme";        
  
  
  await page.goto(url);     
  
  await page.waitForSelector('.mm-canv');          
  const meme = await page.$('.mm-canv');
  
  sleep(2000)
  
  const path = `/images/AiMeme${getRandomInt()}.png`
  const savePath = "." + path
  await meme.screenshot({
    path: savePath
  });
  

  const endTime = new Date().getTime();
  const duration = endTime - startTime;
  totalDuration += duration;
  
  await page.close();                        
  await browser.close(); 
  
  console.log(`Request took ${duration}ms`);
  console.log(`new file: ${path}`)
  res.sendFile(__dirname + path);

});

process.on('SIGINT', () => {
  const averageDuration = totalDuration / requestCount;
  const stats = {
    requests: requestCount,
    averageDuration: averageDuration
  };
  const data = JSON.stringify(stats);
  fs.writeFileSync('stats.json', data);
  console.log('Statistics saved successfully!');
  process.exit();
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});