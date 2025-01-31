export function connect(Mal, s, title){
  const filter = /(?<a>[.,:;]+)|(?![\w]+)(?<b>-)(?![\w]+)|(?<c>-)/gm;
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
  Mal.search({
    type: 'anime',
    query: {
      q: title.slice(0, 64),
      // offset: 1,
      limit: 20,
      nsfw: true
    }
  }).then(
    res => {
      console.log('[MAL API]', res);
      res.data.forEach(r => {
        console.log(r.node.id);
        if(fixer(r.node.title) === title){
          console.log('GOT one!!!', {id: r.node.id, title:r.node.title});
          s.main.id = r.node.id;
          s.main.title = r.node.title;
  
          Mal.getList({
                value: s.main.id,
                type: 'anime',
                query: {
                  fields: ['id', 'title', 'rank', 'rating', 'popularity', 'score', 'mean', 'status', 'broadcast', 'statistics', 'start_date', 'my_list_status', 'num_episodes']
                }
              }).then(
                l => {
                  console.log('LIST', l);
                  console.log('S', l.my_list_status?.score||0)
                  s.main.rating = l.mean;
                  s.main.rank = l.rank;
                  s.main.status = l.status;
                  s.main.weekDay = l.broadcast.day_of_the_week;
                  s.main.weekTime = l.broadcast.start_time;
                  s.main.url = `https://myanimelist.net/anime/${r.node.id}`;
  
                  s.me.status = l.my_list_status?.status;
                  s.me.rating = l.my_list_status?.score||0;
                  s.main.epsNum = l.num_episodes;
                  s.me.eps = l.my_list_status?.num_episodes_watched||0;
                }
              )
        }
      })
    }
  )
}
