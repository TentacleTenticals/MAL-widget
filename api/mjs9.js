export const Mal = {
  url: 'https://api.myanimelist.net/v2',
  dataConverter: (o) => {
    if(!o.data) return;
    if(o.method === 'get') return;
    if(!o.headers['Content-Type']) return;
    switch(o.headers['Content-Type']){
      case 'application/json': return JSON.stringify(o.data);
      case 'application/text': return JSON.stringify(o.data);
      case 'text/html': return o.data;
      case 'application/x-www-form-urlencoded': return new URLSearchParams(o.data);
      default: return o.data;
    }
  },
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
            method: o.method,
            headers: {
                // 'Content-Type': 'application/json',
                ...o.headers
            },
            ...(o.data) && {body: this.dataConverter(o)}
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
    search: function(o){
      o.url = this.vpn;
      o.method = 'GET';

      // console.log('QQQ', o);

      o.headers = {
        'Authorization': 'Bearer '+this.token,
        Url: `https://api.myanimelist.net/v2/anime?${o.query && this.s(o.query)||''}`
      }
      return this.fetch(o);
    },
    getList: function(o){
      o.url = this.vpn;
      o.method = 'GET';

      o.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.token,
        Url: `${this.url}/${o.type}/${o.value||''}?${o.query && this.s(o.query)||''}`
      }

      return this.fetch(o);
    },
    updateList: function(o){
      o.url = this.vpn;
      o.method = 'PUT';

      o.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer '+this.token,
        Url: `${this.url}/${o.type}/${o.value||''}/my_list_status?${o.query && this.s(o.query)||''}`
      }

      return this.fetch(o);
    }
};
