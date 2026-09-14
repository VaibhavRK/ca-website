const fs = require('fs');

const imgPath = 'C:/Users/vaibh/.gemini/antigravity/brain/11380524-dabc-4a78-9f93-ad4aacb7f6b8/media__1789222965249.jpg';
const imgBuf = fs.readFileSync(imgPath);
const base64 = imgBuf.toString('base64');

// Exact viewBox cropped to logo content (941x627 total)
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 170 840 270" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
  <image href="data:image/jpeg;base64,${base64}" x="0" y="0" width="941" height="627" />
</svg>`;

fs.writeFileSync('G:/CAWebsite/public/images/logo.svg', svgContent);
console.log('Successfully created exact font SVG logo!');
