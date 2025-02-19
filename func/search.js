export function search(El, Mal, o){
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
      console.log('[MAL Widget] Search', res);
      if(!res) return;
      if(res.data && getType(res.data) === 'Array'){
        for(let e of res.data){
          const match = textMatcher(e.node.title, o.title, o.cfg.textMatch.percents, o.cfg.textMatch.summ);
          if(match.result.percCheck === 'match'){
            console.log('GOT one!!!', {id: e.node.id, title:e.node.title});
            // o.s.main.id = e.node.id;
            // o.s.main.title = e.node.title;
            // return getList(El, Mal, o, e.node);
            return Mal.getList({
              value: e.node.id,
              type: o.siteType,
              url: o.catcherUrl,
              accToken: o.accToken,
              query: {
                fields: ['id', 'title', 'media_type', 'rank', 'rating', 'popularity', 'score', 'mean', 'status', 'broadcast', 'statistics', 'start_date', 'my_list_status', 'num_episodes', 'num_volumes', 'num_chapters', 'recommendations', 'related_manga', 'related_anime', 'priority']
              }
            });
          }else{
            return {status:'not found', msg:o.siteType+ ' not found', fail:true};
          }
        }
      }else throw (Object.assign(new Error('[MAL Widget Error] Hibernated tab was loaded, need retry'), {
        error: {
          name: 'hibernated',
          msg: 'Hibernated tab was loaded, need retry'
        }
      }));
    }
  )
}
