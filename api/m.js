export const Mal = {
  url: 'https://api.myanimelist.net/v2',
  tokenUrl: 'https://myanimelist.net/v1/oauth2/token',
  authUrl: 'https://myanimelist.net/v1/oauth2/authorize',
  getType: (o) => o && o.constructor.toString().split(/[\(\) ]/)[1],
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
  cc: function (length){
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
  
    for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  
    return text;
  },
  wD: function(day, e){
    if(!day) return;
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
  titleStatus: function(status){
    console.log('SS', status)
    if(!status) return;
    const s = {
      currently_airing: 'Выходит',
      currently_publishing: 'Публикуется',
      finished_airing: 'Вышло',
      finished_publishing: 'Закончено',
      finished: 'Закончена'
    }
    return s[status]||status;
  },
  s: function(o){
    return new URLSearchParams(o);
  },
  fetch: function(o){
      return fetch(o.url, {
            else
            // console.log('qq', r);
              // console.log('[MAL1]', res);
              return res;
          },
          err => {
  },
  loginGen: function(o){
    const data = {
      'response_type': 'code',
      'client_id': o.clientId,
      'redirect_uri': o.redirectUri,
      'code_challenge': o.codeChall
    };

    console.log('DAT', data);

    return this.authUrl+'?'+new URLSearchParams(data);
  },
  getToken: function(o){
    // o.url = 'https://myanimelist.net/v1/oauth2/token';
    o.method = 'POST';

    o.data = {
      grant_type: 'authorization_code',
      client_id: o.clientId,
      client_secret: o.clientSecret,
      redirect_uri: o.redirectUri,
      code: o.code,
    }

    o.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Url: `${this.tokenUrl}?${o.query && this.s(o.query)||''}`
    };

    return this.fetch(o);
  },
  updToken: function(o){
    // o.url = 'https://myanimelist.net/v1/oauth2/token';
    o.method = 'POST';

    o.data = {
      grant_type: 'refresh_token',
      client_id: o.clientId,
      client_secret: o.clientSecret,
      redirect_uri: o.redirectUri,
    };

    o.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',

    return this.fetch(o);
  },
  list: function(o){
      o.url = 'https://api.myanimelist.net/v2/anime/17074/my_list_status';

      this.fetch(o);
  },
  status: function(o){
    o.method = 'get';
    // o.url = this.vpn;
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
    o.method = 'GET';

    o.headers = {

      Url: `${this.url}/${o.type||''}?${o.query && this.s(o.query)||''}`
    }
    console.log('S', o);
    return this.fetch(o);
  },
  getList: function(o){
    o.method = 'GET';

    o.headers = {
      'Content-Type': 'application/json',

      Url: `${this.url}/${o.type||''}/${o.value||''}?${o.query && this.s(o.query)||''}`
    }

    return this.fetch(o);
  },
  updateList: function(o){
    o.method = 'PUT';

    o.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',

      Url: `${this.url}/${o.type||''}/${o.value||''}/my_list_status?${o.query && this.s(o.query)||''}`
    }

    return this.fetch(o);
  }
};
