export const Mal = {
  url: 'https://api.myanimelist.net/v2',
  wD: function(day, e){
    const days = {
    monday: ['понедельник', ['', 'ам']],
    tuesday: ['вторник', ['', 'ам']],
    wednesday: ['среда', ['', 'м']],
    thursday: ['четверг', ['', 'ам']],
    friday: ['пятница', ['', 'м']],
    saturday: ['суббота', ['', 'м']],
    sunday: ['воскресень', ['е', 'ям']]
    };

    if(!e) return days[day][0]+days[day][1][0];
    else return days[day][0]+days[day][1][1];
  },
  s: function(o){
    return new URLSearchParams(o);
  },
    fetch: function(o){
        return fetch(this.vpn, {
            method: o.method||'get',
            headers: {
                'Content-Type': 'application/json',
                ...o.headers
            },
            ...(o.data) && {body: JSON.stringify(o.data)}
        }).then(r => r.json().then(
            res => {
                console.log('[Fetch]', res);
                return res;
            },
            err => {
                console.log('[Fetch] ERR', err);
                console.log('R', r);
            }
        ))
    },
    list: function(o){
        o.url = 'https://api.myanimelist.net/v2/anime/17074/my_list_status';

        this.fetch(o);
    },
    status: function(o){
      o.method = 'get';
      o.url = this.vpn;
      o.query = new URLSearchParams({
        status: 'watching',
        limit: 4
      });
      o.headers = {
        Head: toString({
          'Authorization': 'Bearer '+this.token
        }),
        Info: toString({
          url: 'https://api.myanimelist.net/v2/users/@me/animelist?'+o.query
        })}

      console.log('H', o.headers)

      return this.fetch(o);
    },
    test: function(o){
      o.url = this.vpn;
      o.method = 'POST';

      o.headers = {
        'Authorization': 'Bearer '+this.token,
        Url: 'https://api.myanimelist.net/v2/users/@me?fields=id,name,anime_statistics',
        Method: 'get'
      }
      // o.data = {
      //   url: 'https://api.myanimelist.net/v2/users/@me/animelist?',
      //   method: 'get'
      // }

      // o.headers = {
      //   Head: toString({
      //     'Authorization': 'Bearer '+this.token
      //   }),
      //   Info: toString({
      //     url: 'https://api.myanimelist.net/v2/users/@me/animelist?'
      //   })}

        return this.fetch(o);
    },
    search: function(o){
      o.url = this.vpn;
      o.method = 'POST';

      console.log('QQQ', `https://api.myanimelist.net/v2/anime?${o.query && this.s(o.query).toString()||''}`)

      // o.query = {
      //   q: 'Jujitsu',
      //   limit: 4
      // }

      o.headers = {
        'Authorization': 'Bearer '+this.token,
        Url: `https://api.myanimelist.net/v2/anime?${o.query && this.s(o.query)||''}`,
        Method: 'get'
      }
      return this.fetch(o);
    },
    getList: function(o){
      o.url = this.vpn;
      o.method = 'POST';

      o.headers = {
        'Authorization': 'Bearer '+this.token,
        Url: `${this.url}/${o.type}/${o.value||''}?${o.query && this.s(o.query)||''}`,
        Method: 'get'
      }

      return this.fetch(o);
    },
    updateList: function(o){
      o.url = this.vpn;
      o.method = 'POST';

      o.headers = {
        'Authorization': 'Bearer '+this.token,
        Url: `${this.url}/${o.type}/${o.value||''}/my_list_status?${o.query && this.s(o.query)||''}`,
        Method: 'PUT',
        Type: 'application/x-www-form-urlencoded'
      }

      const q = {
        status: 'completed',
        score: '10',
        num_watched_episodes: '24'
      }

      return this.fetch(o);
    }
};
