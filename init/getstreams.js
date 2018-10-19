const fetch = require('node-fetch');
const fs = require('fs');


    const API = 'AIzaSyBghJmzrFiYYr4ClicgFYHvN4ubVsnJxuE';

    const streamList = [
      {name:'ice', channelId: 'UCv9Edl_WbtbPeURPtFDo-uA'},
      {name:'mixhound', channelId: 'UC_jxnWLGJ2eQK4en3UblKEw'},
      {name:'tsa', channelId: 'UCB0H_1M78_jwTyfaJuP241g'},
      {name:'destiny', channelId: 'UC554eY5jNUfDq3yDOJYirOQ'},
      {name:'hyphonix', channelId: 'UC4abN4ZiybnsAXTkTBX7now'},
      {name:'marie', channelId: 'UC16fss-5fnGp2Drqp1iT9pA'},
      {name:'gary', channelId: 'UCvxSwu13u1wWyROPlCH-MZg'},
      {name:'burger', channelId: 'UC3MAdjjG3LMCG8CV-d7nEQA'},
      {name:'pepper', channelId: 'UCdSr4xliU8yDyS1aGnCUMTA'},
      {name:'evan', channelId: 'UCHYUiFsAJ-EDerAccSHIslw'},
      {name:'lolesports', channelId: 'UCvqRdlKsE5Q8mf8YXbdIJLw'},
      {name:'chilledcow', channelId: 'UCSJ4gkVC6NrvII8umztf0Ow'},
      {name:'cxnews', channelId: 'UCStEQ9BjMLjHTHLNA6cY9vg'},
      {name: 'andy', channelId: 'UCovb8rgpCANx6nwDwnW0Uqg'},
      {name: 'code', channelId: 'UCvjgXvBlbQiydffZU7m1_aw'}
    ];
giveList();
setInterval(giveList, 500000);


    async function giveList() {
try {
  const data = await Promise.all(streamList.map(async (item) => {
      const fetchData = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${item.channelId}&eventType=live&type=video&key=${API}`);
      const dataFetch = await fetchData.json();
      dataFetch.channelId = item.channelId;
      dataFetch.name = item.name;
      return dataFetch;
  }));
  allStreams = data;
  const newdata = JSON.stringify(data);
  fs.writeFile(`./fetches/all.json`, newdata, () => console.log('All JSON Stored...'));

  const liveStreams = data.filter(item => !item.pageInfo.totalResults == 0);

  const liveData = await Promise.all(liveStreams.map(async (item) => {
      const vidid = item.items[0].id.videoId;
      const fetchData = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2CliveStreamingDetails&id=${vidid}&key=${API}`);
      const dataFetch = await fetchData.json();
      dataFetch.channelId = item.channelId;
      dataFetch.name = item.name;
      return dataFetch;
  }));

  const filteredData = liveData.filter(item => item.items[0].liveStreamingDetails.concurrentViewers);

  const activeData = JSON.stringify(filteredData);
  fs.writeFile(`./fetches/activestreamers.json`, activeData, () => console.log('Active JSON Stored...'));
} catch(err) {
  console.log(err);
}

  }


