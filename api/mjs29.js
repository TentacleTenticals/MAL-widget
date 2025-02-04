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
  s: function(o){
    return new URLSearchParams(o);
  },
  fetch: function(o){
      return fetch(o.url, {
          method: o.method,
          headers: {
              ...o.headers
          },
          ...(o.data) && {body: this.dataConverter(o)}
      }).then(
        r => {
          if(r.ok) return r.json();
          else {
            console.log('R', r);
          throw Object.append(new Error('[MAL API ERR]', r));
          }
        }).then(
          res => {
            // console.log('q', this.getType(res));
            if(res.error) throw Object.append(new Error('[MAL API ERR]', res));
            else
            // console.log('qq', r);
              // console.log('[MAL1]', res);
              return res;
          },
          err => {
            console.log('[MAL] ERR', err);
            // throw Object.append(new Error('[MAL API ERR]', err));
            return err;
              // console.log('[MAL] R', r);
          }
      )
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
      code_verifier: o.codeVer,
      ...o.data
    }

    o.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Url: `${this.tokenUrl}?${o.query && this.s(o.query)||''}`
    };

    console.log('Q', o);

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
      refresh_token: o.refToken,
      ...o.data
    };

    o.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Authorization': 'Bearer '+o.token,
      Url: `${this.tokenUrl}?${o.query && this.s(o.query)||''}`
    };

    console.log('o', o);

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
      'Authorization': 'Bearer '+o.token,
      Url: `${this.url}/${o.type||''}?${o.query && this.s(o.query)||''}`
    }
    console.log('S', o);
    return this.fetch(o);
  },
  getList: function(o){
    o.method = 'GET';

    o.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+o.token,
      Url: `${this.url}/${o.type||''}/${o.value||''}?${o.query && this.s(o.query)||''}`
    }

    return this.fetch(o);
  },
  updateList: function(o){
    o.method = 'PUT';

    o.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer '+o.token,
      Url: `${this.url}/${o.type||''}/${o.value||''}/my_list_status?${o.query && this.s(o.query)||''}`
    }

    console.log('O', o);

    return this.fetch(o);
  }
};
