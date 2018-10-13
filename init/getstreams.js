const fetch = require('node-fetch');
const fs = require('fs');

    let streamerRay = [];
    let counter;
    const API = 'AIzaSyBghJmzrFiYYr4ClicgFYHvN4ubVsnJxuE';
    class getUser {
      constructor(name, channelId, vidid, checker) {
        this.name = name;
        this.channelId = channelId;
        this.videoid = vidid;
        this.checker = checker;
      }
      getData() {
        if(!this.checker) {
          streamerRay.push(this.name) 
          this.checker = true;
        }        
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.channelId}&eventType=live&type=video&key=${API}`)
        .then((res) => res.json())
        .then(data => {
          data.channelId = this.channelId;
          const newdata = JSON.stringify(data);
          if (data.pageInfo.totalResults > 1) {
            data.items.splice(0, 1);
          }
          fs.writeFile(`./fetches/${this.name}.json`, newdata, finished)
          if (!data.pageInfo.totalResults == 0) {
          this.videoid = data.items[0].id.videoId;
          }
          function finished() {
            console.log('JSON stored...')
          }
        }).then(() => {
          if (this.videoid == undefined) return;
          getStats(this.videoid, this.name, this.channelId);
        }).catch((err) => {
          console.log(err)
        })
    
    }
    }
    // let burger = new getUser('burger', 'UCJNILr75xb9zKpUI0RV7pmQ'); old burger
    let ice = new getUser('ice', 'UCv9Edl_WbtbPeURPtFDo-uA', checker= false);
    let hyphonix = new getUser('hyphonix', 'UC4abN4ZiybnsAXTkTBX7now', checker= false);
    let tsa = new getUser('tsa', 'UCB0H_1M78_jwTyfaJuP241g', checker= false);
    let destiny = new getUser('destiny', 'UC554eY5jNUfDq3yDOJYirOQ', checker= false);
    let mix = new getUser('mix', 'UC_jxnWLGJ2eQK4en3UblKEw', checker= false);
    let marie = new getUser('marie', 'UC16fss-5fnGp2Drqp1iT9pA', checker= false);
    let burger = new getUser('burger', 'UC3MAdjjG3LMCG8CV-d7nEQA', checker= false);
    let cxnews = new getUser('cxnews', 'UCStEQ9BjMLjHTHLNA6cY9vg', checker= false);
    let chilledcow = new getUser('chilledcow', 'UCSJ4gkVC6NrvII8umztf0Ow', checker= false);
    let lol = new getUser('lol', 'UCvqRdlKsE5Q8mf8YXbdIJLw', checker= false);
    let pepper = new getUser('pepper', 'UCdSr4xliU8yDyS1aGnCUMTA', checker= false);
    let evan = new getUser('evan', 'UCHYUiFsAJ-EDerAccSHIslw', checker= false);
    let gary = new getUser('gary', 'UCvxSwu13u1wWyROPlCH-MZg', checker= false);
    
    fetcher();
    setInterval(fetcher, 500000)
    function fetcher() {
      mix.getData();
      ice.getData();
      tsa.getData();
      hyphonix.getData();
      destiny.getData();
      marie.getData();
      burger.getData();
      cxnews.getData();
      chilledcow.getData();
      lol.getData();
      pepper.getData();
      evan.getData();
      gary.getData();
    }
    
    function getStats(vidnum, name, channelId) {
      fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2CliveStreamingDetails&id=${vidnum}&key=${API}`)
      .then((res) => res.json())
      .then((data) => {
        data.channelId = channelId;
        const newdata = JSON.stringify(data);
        fs.writeFile(`./fetches/${name}stats.json`, newdata, finished)
        function finished(err) {
        }
      })
    }
    

module.exports = streamerRay;