const https = require('https');

function fetchYT(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titles = [];
        const regex = /"title":\{"runs":\[\{"text":"([^"]+)"/g;
        let match;
        while ((match = regex.exec(data)) !== null) {
          if (!titles.includes(match[1]) && !match[1].includes('YouTube') && match[1].length > 3) {
            titles.push(match[1]);
          }
        }
        resolve(titles);
      });
    }).on('error', e => resolve([]));
  });
}

async function run() {
  const oldSongs = await fetchYT('https://www.youtube.com/playlist?list=RDEMLUpB5J3MCs9ZDMJD7TqX4g');
  console.log('Old Songs:', oldSongs.slice(0, 10));

  const bengaliSongs = await fetchYT('https://www.youtube.com/playlist?list=RD1Xr0_Ec6m8Q');
  console.log('Bengali Songs:', bengaliSongs.slice(0, 10));
}

run();
