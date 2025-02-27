export function search(El, Mal, o){
  const getType = (o) => o && o.constructor.toString().split(/[\(\) ]/)[1];
  function textMatcher(text, text2, perc, sum){
  function removeSym(text){
    const filter = /([\W]+)/gm;
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
  console.log('1', text);
  console.log('2', text2);
  
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
      // o.resArray.push({match:o.main[i]});
      // o.txt ? '' : o.txt = '';
      // o.txt += text[i];
      o.main[i] && (match += o.main[i]);
      notM && o.resArray.push({notM: notM, n:i||''});
      notM = '';
      // o.main = o.main.substring(i);
      // o.main = o.main.slice(0, i) + o.main.slice(i+1);
    }else
    if(o.main[i] !== o.sec[i]){
      // console.log('NOT', o.main[i]);
      // o.resArray.push({notM:o.main[i]});
      o.main[i] && (notM += o.main[i]);
      match && o.resArray.push({match: match, n:i||''});
      match = '';
      
      // if(o.main[i+1] && o.main[i+1] === o.sec[i]){
      //   o.main = o.main.slice(0, i) + o.main.slice(i+1);
      // }
      // console.log('q', o.main.substring(i))
      // o.main = o.main.substring(i);
      // o.sec = o.sec.substring(i);
      // console.log('QQ', o.main.slice(0, i));
      o.main = o.main.slice(0, i) + o.main.slice(i+1);
      // o.sec = o.sec.slice(0, i) + o.sec.slice(i+1);
    }//else o.resArray.push(match)
  }
  match && o.resArray.push({match: match, n:o.main.length});
  notM && o.resArray.push({notM: notM, n:o.main.length});
  
  // let len = 0;
  o.resArray.forEach(e => {
    if(e.match) o.status.matchLen += e.match.length;
    else o.status.notMatchLen += e.notM.length;
  });
  
  o.result.perc = {
    result: ((100 * o.status.matchLen) / o.main.length).toFixed(2),
    match: o.result.percents > perc,
    check: perc
  }
  o.result.summ = {
    result: sum,
    match: o.status.notMatchLen < sum,
    check: sum
  }
  o.result.type = 'textMatcher';
  
  console.log('[Text Matcher]', o);
  
  return o;
}
  function textMatcherLev(text, text2, perc, summ){
    function removeSym(text){
      const filter = /([\W]+)/gm;
      const norm = /[\u0300-\u036F]/g;
      const fixer = (text) => text.normalize('NFKD').replace(norm, '').replace(filter, '').toLowerCase();
      
      return fixer(text);
    };
    text = removeSym(text);
    text2 = removeSym(text2);
    function levenshtein(s, t){
      if (!s.length) return t.length;
      if (!t.length) return s.length;
      const arr = [];
      for (let i = 0; i <= t.length; i++){
        arr[i] = [i];
        for (let j = 1; j <= s.length; j++){
          arr[i][j] = i === 0 ? j
            : Math.min(
                arr[i - 1][j] + 1,
                arr[i][j - 1] + 1,
                arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
              );
        }
      }
      return ((1 - arr[t.length][s.length] / Math.max(s.length, t.length)) * 100).toFixed(2);
    };
  
    const res = levenshtein(text, text2);
    const r = {
      result: {
        type: 'levenshtein',
        perc: {result: res, match: res >= perc, check: perc}
      }
    };
    console.log('[TextMatcherLev]', r);
    return r;
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
        const check = {};
        res.data.forEach((e, ind) => {
          const match = o.cfg.textMatch.type === 'textMatch' ?
            textMatcher(e.node.title, o.title, o.cfg.textMatch.percents, o.cfg.textMatch.summ)
            : textMatcherLev(e.node.title, o.title, o.cfg.textMatch.percents, o.cfg.textMatch.summ);
          if(!check.m){
            check.m = match;
            check.ind = ind;
          }
          else if(+check.m.result.perc.result < +match.result.perc.result){
            check.m = match;
            check.ind = ind;
          }
        });

        // const match = o.cfg.textMatch.type === 'textMatch' ?
        //   textMatcher(e.node.title, o.title, o.cfg.textMatch.percents, o.cfg.textMatch.summ)
        //   : textMatcherLev(e.node.title, o.title, o.cfg.textMatch.percents, o.cfg.textMatch.summ);
        if(check.m.result.perc.match||check.m.result.summ && check.m.result.summ.match){
          console.log('GOT one!!!', {id: res.data[check.ind].node.id, title: res.data[check.ind].node.title});

          return Mal.getList({
            value: res.data[check.ind].node.id,
            type: o.siteType,
            url: o.catcherUrl,
            accToken: o.accToken,
            query: {
              fields: ['id', 'title', 'media_type', 'rank', 'rating', 'popularity', 'score', 'mean', 'status', 'broadcast', 'statistics', 'start_date', 'my_list_status', 'num_episodes', 'num_volumes', 'num_chapters', 'recommendations', 'related_manga', 'related_anime', 'priority']
            }
          });
        }else{
          // if(res.data.length === len+1);
          return {status:'not found', msg:o.siteType+ ' not found', fail:true};
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
