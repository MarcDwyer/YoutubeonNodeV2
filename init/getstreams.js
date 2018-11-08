const fetch = require('node-fetch');
const fs = require('fs');


    const API = 'AIzaSyBghJmzrFiYYr4ClicgFYHvN4ubVsnJxuE';

    const streamList = [
      {name:'Ice', channelId: 'UCv9Edl_WbtbPeURPtFDo-uA'},
      {name:'Mixhound', channelId: 'UC_jxnWLGJ2eQK4en3UblKEw'},
      {name:'Tsa', channelId: 'UCB0H_1M78_jwTyfaJuP241g'},
      {name:'Destiny', channelId: 'UC554eY5jNUfDq3yDOJYirOQ'},
      {name:'Hyphonix', channelId: 'UC4abN4ZiybnsAXTkTBX7now'},
      {name:'Marie', channelId: 'UC16fss-5fnGp2Drqp1iT9pA'},
      {name:'Gary', channelId: 'UCvxSwu13u1wWyROPlCH-MZg'},
      {name:'Burger', channelId: 'UC3MAdjjG3LMCG8CV-d7nEQA'},
      {name:'Pepper', channelId: 'UCdSr4xliU8yDyS1aGnCUMTA'},
      {name:'Evan', channelId: 'UCHYUiFsAJ-EDerAccSHIslw'},
      {name:'Lolesports', channelId: 'UCvqRdlKsE5Q8mf8YXbdIJLw'},
      {name:'Chilledcow', channelId: 'UCSJ4gkVC6NrvII8umztf0Ow'},
      {name:'Cxnews', channelId: 'UCStEQ9BjMLjHTHLNA6cY9vg'},
      {name: 'Andy', channelId: 'UCovb8rgpCANx6nwDwnW0Uqg'},
      {name: 'Code', channelId: 'UCvjgXvBlbQiydffZU7m1_aw'},
      {name: 'Joe', channelId: 'UCzQUP1qoWDoEbmsQxvdjxgQ'},
      {name: 'Me', channelId: 'UCBawnZIFCiN_WNvsseGyjYA'},
      {name: 'Nasa', channelId: 'UCLA_DiR1FfKNvjuUpBHmylQ'}
    ];

giveList();
setInterval(giveList, 850000);

    async function giveList() {
try {
  const data = await Promise.all(streamList.map(async (item) => {
      const fetchData = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${item.channelId}&eventType=live&type=video&key=${API}`);
      const dataFetch = await fetchData.json();
      dataFetch.name = item.name;
      dataFetch.channelId = item.channelId;
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

  module.exports = streamList;
