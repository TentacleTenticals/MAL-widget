export function connect(Mal, o){
  const filter = /(?<a>[.,:;]+)|(?![\w]+)(?<b>-)(?![\w]+)|(?<c>-)/gm;
  const getType = (o) => o && o.constructor.toString().split(/[\(\) ]/)[1];
  const fixer = (text) => text.replace(filter, (_, a, b, c) => {
    if(a){
      // console.log('A', a);
      return '';
    }else
    if(b){
      // console.log('B', b);
      return b;
    }else
    if(c){
      // console.log('C', c);
      return ' ';
    }
  }).toLowerCase();

  function search(r){
    Mal.search({
      type: o.type,
      url: o.url,
      token: o.token,
      query: {
        q: o.title.slice(0, 64),
        // offset: 1,
        limit: 20,
        nsfw: true
      }
    }).then(
      res => {
        console.log('[MAL API]', res);
        if(!res.data||getType(res.data) !== 'Array'){
          r.try++;
          return search(r);
        }else
        res.data.forEach(r => {
          // console.log(r.node.id);
          if(fixer(r.node.title) === o.title){
            console.log('GOT one!!!', {id: r.node.id, title:r.node.title});
            o.s.main.id = r.node.id;
            o.s.main.title = r.node.title;
    
            Mal.getList({
              value: o.s.main.id,
              type: o.type,
              url: o.url,
              token: o.token,
              query: {
                fields: ['id', 'title', 'rank', 'rating', 'popularity', 'score', 'mean', 'status', 'broadcast', 'statistics', 'start_date', 'my_list_status', 'num_episodes']
              }
            }).then(
              l => {
                // console.log('LIST', l);
                // console.log('S', l.my_list_status?.score||0)
                o.s.main.rating = l.mean;
                o.s.main.rank = l.rank;
                o.s.main.status = l.status;
                o.s.main.weekDay = l.broadcast?.day_of_the_week;
                o.s.main.weekTime = l.broadcast?.start_time;
                o.s.main.url = `https://myanimelist.net/anime/${r.node.id}`;

                o.s.me.status = l.my_list_status?.status;
                o.s.me.rating = l.my_list_status?.score||0;
                o.s.main.epsNum = l.num_episodes;
                o.s.me.eps = l.my_list_status?.num_episodes_watched||0;
              }
            )
          }
        })
      },
      err => {
        console.log('[MAL API] ERR', err);
        if(r.try < r.max){
          r.try++;
          return search(r);
        }
      }
    )
  }

  search();
}
