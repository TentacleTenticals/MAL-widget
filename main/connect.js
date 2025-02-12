export async function connect(El, Mal, o){
  console.log('Connect', o);
  const getType = (o) => o && o.constructor.toString().split(/[\(\) ]/)[1];

  function textMatcher(text, text2, perc, sum){
    function removeSym(text){
      const filter = /([\W]*)/gm;
      const norm = /[\u0300-\u036F]/g;
      const fixer = (text) => text.normalize('NFKD').replace(norm, '').replace(filter, '').toLowerCase();
      
      return fixer(text);
    };
    
    const o = {
      txt1: text,
      txt2: text2,
      resArray: [],
      status: {
        matchLen: 0,
        notMatchLen: 0,
        maxLen: 0
      },
      result: {}
    };
    text = removeSym(text);
    text2 = removeSym(text2);
    
    if(text.length > text2.length){
      o.status.maxLen = text.length;
      o.main = text;
      o.sec = text2;
    }else{
      o.status.maxLen = text2.length;
      o.main = text2;
      o.sec = text;
    }
    let match = '';
    let notM = '';
    
    for(let i = 0; i < o.status.maxLen; i++){
      // console.log('Q', i);
      if(o.main[i] === o.sec[i]){
        // console.log('Ok', match);
        // o.txt ? '' : o.txt = '';
        // o.txt += text[i];
        match += o.main[i]||'';
        notM && o.resArray.push({notM: notM, n:i-1||''});;
        notM = '';
      }else
      if(o.main[i] !== o.sec[i]){
        // console.log('NOT', match);
        notM += o.main[i]||'';
        match && o.resArray.push({match: match, n:i-1||''});
        match = '';
        // console.log('QQ', text2.slice(0, i) + text2.slice(i+1, text2.length));
        o.main = o.main.slice(0, i) + o.main.slice(i+1, o.main.length);
      }else o.resArray.push(match)
    }
    match && o.resArray.push({match: match, n:o.main.length});
    
    // let len = 0;
    o.resArray.forEach(e => {
      if(e.match) o.status.matchLen += e.match.length;
      else o.status.notMatchLen += e.notM.length;
    });
    
    o.result.percents = ((100 * o.status.matchLen) / o.main.length).toFixed(2);
    
    if(o.result.percents > perc){
      o.result.percCheck = 'match';
      // console.log('[Text Matcher] Percents MATCH!', o.percent);
    }
    if(o.status.notMatchLen < sum){
      o.result.summCheck = 'match';
      // console.log('[Text Matcher] Sum MATCH!', o.status.notMatchLen);
    }
    
    console.log('[Text Matcher]', o);
    
    return o;
  }

  return Mal.search({
    type: o.siteType,
    url: o.catcherUrl,
    accToken: o.accToken,
    query: {
      q: o.title.slice(0, 64),
      // offset: 1,
      limit: 20,
      nsfw: true
    }
  }).then(
    res => {
      console.log('[MAL API]', res);

      if(res && res.data && getType(res.data) === 'Array'){
        for(let e of res.data){
          const match = textMatcher(e.node.title, o.title, o.cfg.textMatch.percents, o.cfg.textMatch.summ);
          if(match.result.percCheck === 'match'){
            console.log('GOT one!!!', {id: e.node.id, title:e.node.title});
            o.s.main.id = e.node.id;
            o.s.main.title = e.node.title;
            return getList(El, Mal, o, e.node);
            // break;
          }
        }
      }else{
        res = undefined;
        throw new Error('[MAL Widget E] Not array/no array');
      }








      
      // if(!res||!res.data||getType(res.data) !== 'Array'){
      //   // o.retry.try++;
      //   throw new Error('[MAL Widget] Not array');
      // }else
      // res && res.data && res.data.forEach(r => {
      //   // console.log(r.node.id);
      //   if(fixer(r.node.title) === o.title){
      //     console.log('GOT one!!!', {id: r.node.id, title:r.node.title});
      //     o.s.main.id = r.node.id;
      //     o.s.main.title = r.node.title;
  
      //     Mal.getList({
      //       value: o.s.main.id,
      //       type: o.siteType,
      //       url: o.catcherUrl,
      //       accToken: o.accToken,
      //       query: {
      //         fields: ['id', 'title', 'rank', 'rating', 'popularity', 'score', 'mean', 'status', 'broadcast', 'statistics', 'start_date', 'my_list_status', 'num_episodes']
      //       }
      //     }).then(
      //       l => {
      //         // console.log('LIST', l);
      //         // console.log('S', l.my_list_status?.score||0)
      //         o.s.main.rating = l.mean;
      //         o.s.main.rank = l.rank;
      //         o.s.main.status = l.status;
      //         o.s.main.weekDay = l.broadcast?.day_of_the_week;
      //         o.s.main.weekTime = l.broadcast?.start_time;
      //         o.s.main.url = `https://myanimelist.net/anime/${r.node.id}`;

      //         o.s.me.status = l.my_list_status?.status;
      //         o.s.me.rating = l.my_list_status?.score||0;
      //         o.s.main.epsNum = l.num_episodes;
      //         o.s.me.eps = l.my_list_status?.num_episodes_watched||0;
      //       }
      //     )
      //   }
      // })
    },
    err => {
      console.log('[MAL API] ERR', err);
      // if(+o.retry.try < +o.retry.max){
      //   o.retry.try++;
      //   connect(Mal, o);
      //   return;
      // }
    }
  )
};

const getList = (El, Mal, o, item) => Mal.getList({
  value: item.id,
  type: o.siteType,
  url: o.catcherUrl,
  accToken: o.accToken,
  query: {
    fields: ['id', 'title', 'media_type', 'rank', 'rating', 'popularity', 'score', 'mean', 'status', 'broadcast', 'statistics', 'start_date', 'my_list_status', 'num_episodes', 'num_volumes', 'num_chapters', 'priority']
  }
}).then(
  l => {
    console.log('MAL', l);
    const time = El.getTime(l.my_list_status?.updated_at, 'full');
    // o.s.main.id = r.node.id;
    // o.s.main.title = r.node.title;
    // console.log('LIST', l);
    // console.log('S', l.my_list_status?.score||0)
    o.s.main.rating = l.mean||'-';
    o.s.main.rank = l.rank||'-';
    o.s.main.status = l.status||'';
    o.s.main.broadcastStatus = Mal.titleStatus(l.status);
    l.broadcast && (o.s.main.broadcastDate = true);
    l.broadcast && (o.s.main.weekDay = l.broadcast?.day_of_the_week);
    l.broadcast && (o.s.main.weekTime = l.broadcast?.start_time);
    o.s.main.url = `https://myanimelist.net/${o.siteType}/${item.id}`;

    o.s.me.status = l.my_list_status?.status;
    o.s.me.rating = l.my_list_status?.score||0;
    o.s.me.priority = l.my_list_status?.priority||0;
    time && (o.s.me.updatedAt = time.date+' '+time.time);
    if(o.siteType === 'anime'){
      o.s.main.epsNum = l.num_episodes||'?';
      o.s.me.eps = l.my_list_status?.num_episodes_watched||0;
      o.s.me.rewatchNreread = l.my_list_status?.is_rewatching||false;
    }else{
      o.s.main.volumesNum = l.num_volumes||'?';
      o.s.main.chaptersNum = l.num_chapters||'?';
      o.s.me.volumes = l.my_list_status?.num_volumes_read||0;
      o.s.me.chapters = l.my_list_status?.num_chapters_read||0;
      o.s.me.rewatchNreread = l.my_list_status?.is_rereading||false;
      // o.s.main.volumes = l.me.volumes;
    }
  }
)
