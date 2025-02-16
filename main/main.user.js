// ==UserScript==
// @name        MAL Widget
// @namespace   TentacleTenticals
// @match       https://anime-joy.online/*
// @match       https://*animespirit.ru/*
// @match       https://mangalib.me/ru*
// @grant       GM.setValue
// @grant       GM.getValue
// @noframes
// @version     1.0.2
// @author      TentacleTenticals
// @description Скрипт для добавления виджета MAL на аниме/манга сайты
// @homepage    https://github.com/TentacleTenticals/MAL-widget
// @updateURL   https://raw.githubusercontent.com/TentacleTenticals/MAL-widget/refs/heads/main/main/main.user.js
// @downloadURL https://raw.githubusercontent.com/TentacleTenticals/MAL-widget/refs/heads/main/main/main.user.js
//
// @requireq     https://raw.githubusercontent.com/TentacleTenticals/dtf-libs-2.0/main/classes/mjs.js?
// @requireq      https://github.com/TentacleTenticals/MAL-widget/raw/refs/heads/main/css/main.js
// ==/UserScript==

(async () => {

  const {Mal} = await import('https://cdn.jsdelivr.net/gh/TentacleTenticals/MAL-widget@1.0.58/api/m.js');
  const {El} = await import('https://cdn.jsdelivr.net/gh/TentacleTenticals/MAL-widget@1.0.58/classes/m.js');
  const {css} = await import('https://cdn.jsdelivr.net/gh/TentacleTenticals/MAL-widget@1.0.58/css/m.js');
  const {baseCSS} = await import('https://cdn.jsdelivr.net/gh/TentacleTenticals/MAL-widget@1.0.58/css/base.js');

  const {build} = await import('https://cdn.jsdelivr.net/gh/TentacleTenticals/MAL-widget@1.0.58/func/build.js');
  const {connect} = await import('https://cdn.jsdelivr.net/gh/TentacleTenticals/MAL-widget@1.0.58/func/connect.js');
  const {tokenModal} = await import('https://cdn.jsdelivr.net/gh/TentacleTenticals/MAL-widget@1.0.58/interface/tokenModal.js');
  const init = {};

  El.log('[MAL Widget] Loading...', 'green');

  El.Css('MAL', css(), true);
  El.Css('Base', baseCSS(), true);

  async function valGen(varArray){
    const getV = async (name) => await GM.getValue(name, null);
    const setV = async (name, value) => await GM.setValue(name, value);

    varArray.forEach(async e => {
      if(!await getV(e)) await setV(e, '');
    });
  };

  function siteName(e){
    for(let site of e){
      if(document.location.href.match(site.main)){
        return site;
      }
    };
  };

  function sFunc(o){
    // console.log('LOG', o);
    const path = () => document.body.querySelector(o.path);
    const title = () => document.body.querySelector(o.pathTitle)?.textContent;

    return new Promise((res, err) => {
      const search = () => {
        if(!o.divRetry.try) o.divRetry.try = 0;
        if(o.divRetry.try < o.divRetry.max){
          o.divRetry.try++;
          const r = {
            path: path(),
            title: title()
          };
          // El.log('RES', 'green', r);
          if(r.path && r.title && El.getType(r.title) === 'String') return res(r);
          else setTimeout(() => search(), o.timeout);//search();
        }else err('[MAL Widget sFunc] Не получены пути для встраивания виджета/получения названия тайтла');
      }
      return search();
    }).then(
      res => {
        // console.log('RETURN', res);

        return res;
      }
    )
  };

  function run(o){
    console.log('[MAL Widget] Run');

    const data = {
      main: {
        title: '',
        id: '',
        rank: '',
        url: '',
        status: '',
        rating: '',
        epsNum: '',
        volumesNum: '',
        chaptersNum: '',
        weekDay: '',
        weekTime: ''
      },
      me: {
        status: '',
        rating: '',
        eps: '',
        volumes: '',
        chapters: ''
      }
    };
    const s = {
      main: {},
      me: {}
    };

    if(data.main.title) console.log('OOOOOOO', data.main);

    function buildCon(){
      connect(El, Mal, {...o, s:s, data:data}).then(
        res => {
          El.log('[MAL Widget] Connect', 'green', res);
        },
        err => {
          El.log('[MAL Widget ERR] Connect', 'red', err);
          if(o.cfg.malRetry.try < o.cfg.malRetry.max){
            o.cfg.malRetry.try++;
            document.getElementById('mal-widget').remove();
            run(o);
            // connect(El, Mal, {s:s, title:i.title, type:i.type, url:o.url, token:o.token, retry:o.retry});
          }
        }
      )
    };
    build(El, Mal, {...o, data:data, s:s});
    buildCon();
  }

  const fc = {
    initer: async function(o){
      if(o.cfg.sitesImport){
        const sites = await GM.getValue('sites', null);
        if(!sites) await GM.setValue('sites', ['']);
        else{
          for(let s of sites){
            if(s && s.match(/http[s]:\/\/.+/)){
              El.log('[MAL Widget] Найдена ссылка, импортирую...', s, 'green');
              o.sites.push(...(await import(s)).sites);
            }
          }
          console.log('SITES UPD', o);
        }
      }
      // El.log('[MAL Widget] Initer', 'green');

      const site = siteName(o.sites);
      // console.log('SITE', site);
      if(site.spa){
        for(let url of site.links){
          console.log('CHECK', document.location.href.match(url[0]));
          if(document.location.href.match(url[0])){
            const div = await sFunc(site.func);
            // console.log('DIV', div);
            // console.log('TK', init.tk);

            if(!init.tk) init.tk = await this.tokenChecker(o);
            // console.log('TK', init.tk);

            run({...init.tk, ...div, siteType:url[1], cfg:o.cfg});

  //             const tk = await tokenChecker(o);
  //             console.log('TK', tk);

  //             run({...tk, ...div, siteType:url[1], cfg:o.cfg});
          }
        }

        if(!init.spa) document.body.addEventListener('click', () => {
          requestAnimationFrame(() => {
            if(init.spa !== location.href){
              // console.log('url changed');
              init.spa = location.href;
              this.initer(o);
            }
          });
        }, true);
      }else{
        for(let url of site.links){
          if(document.location.href.match(url[0])){
            const div = await sFunc(site.func);
            // console.log('DIV', {...div, ...site, siteType:url[1], cfg:o.cfg});

            // const tk = await this.tokenChecker(o);
            // console.log('TK', tk);

            // if(tk.tokenInfo === 'tokens created'){}

            this.tokenChecker(o).then(
              async res => {
                // console.log('RES', res);

                if(res.tokenInfo.status === 'ok'){
                  // const tk = res;
                  run({...res, ...div, siteType:url[1], cfg:o.cfg});
                }else
                if(res.tokenInfo.status === 'created'){
                  const tk = {
                    accToken: res.access_token,
                    refToken: res.refresh_token,
                    catcherUrl: (await GM.getValue('info', null)).catcherUrl,
                    date: Date.parse(new Date())
                  };
                  await GM.setValue('secrets', tk);
                  run({...tk, ...div, siteType:url[1], cfg:o.cfg});
                }else
                if(res.tokenInfo.status === 'expired'){
                  // const tk = res;
                  const secrets = await GM.getValue('secrets', null);
                  const info = await GM.getValue('info', null);

                  Mal.updToken({
                    ...info,
                    ...secrets,
                    url: secrets.catcherUrl
                  }).then(
                    async res => {
                      console.log('[MAL Widget] Токены обновлены', res);

                      const tk = {
                        accToken: res.access_token,
                        refToken: res.refresh_token,
                        catcherUrl: info.catcherUrl,
                        date: Date.parse(new Date())
                      };
                      await GM.setValue('secrets', tk);

                      run({...tk, ...div, siteType:url[1], cfg:o.cfg});
                    },
                    err => {
                      console.log('[MAL Widget ERR] Токены не обновлены', err);
                    }
                  )
                }
              },
              err => {
                console.log('[MAL Widget ERR]', err);
              }
            )
          }
        }
      }
    },
    tokenChecker: async function(o){
      console.log('[MAL Widget] TokenChecker');
      let token = await GM.getValue('secrets', null);

      if(!token||!token.accToken){
        El.log('NO TOKEN!!!', 'red');
        return new Promise(async (response, error) => {
          const info = await GM.getValue('info', null);
          if(!info) await GM.setValue('info', {
            clientId: '',
            clientSecret: '',
            redirectUri: '',
            catcherUrl: ''
          });

          El.Dialog({
            path: document.body,
            class: 'mdl',
            showM: true,
            prevClose: true,
            func: (d) => {
              El.Div({
                path: d,
                class: 'd-header',
                text: '[MAL Widget]'
              });

              El.Div({
                path: d,
                text: 'Сгенерированы варки. Введите данные во вкладке скрипта [Данные]'
              });

              El.Button({
                path: d,
                text: 'Нажмите на меня, когда все необходимые данные введены',
                onclick: async () => {
                  d.close();

                  return tokenModal(El, Mal, {
                    secrets: await GM.getValue('info', null),
                    gm: GM,
                    promise: [response, error]
                  });
                }
              });
            }
          });
        });
      }
      else
      if(token && token.accToken){

        const dc = {
          msDay: function (day){
            const d = 86400000;
            return (day||1) * d;
          },
          msCheck: function (cur, check){
            switch(true){
              case cur === check: return '=';
              case cur > check: return '>';
              case cur < check: return '<';
              default: return 'nope';
            }
          },
          curDay: Date.parse(new Date),
          checkDate: function(savedDate){
            const upd = savedDate + this.msDay(o.cfg.timer);
            const upd2 = savedDate + this.msDay(o.cfg.timer * 2);

            if(this.msCheck(this.curDay, upd2) === '>'){
              return {
                msg: 'Токены полностью устарели. Получите новые',
                status: 'too expired',
                curDate: new Date(this.curDay).toString(),
                savDate: new Date(savedDate).toString(),
                expDate1: new Date(upd).toString(),
                expDate2: new Date(upd2).toString()
              };
            }else
            if(this.msCheck(this.curDay, upd) === '>'){
              return {
                msg: 'Токены устарели',
                status: 'expired',
                curDate: new Date(this.curDay).toString(),
                savDate: new Date(savedDate).toString(),
                expDate1: new Date(upd).toString(),
                expDate2: new Date(upd2).toString()
              };
            }else
            if(this.msCheck(this.curDay, upd) === '<'){
              return {
                msg: 'Токены в порядке',
                status: 'ok',
                curDate: new Date(this.curDay).toString(),
                savDate: new Date(savedDate).toString(),
                expDate1: new Date(upd).toString(),
                expDate2: new Date(upd2).toString()
              };
            }
          }
        };

        return {
          tokenInfo: dc.checkDate(token.date),
          accToken: token.accToken,
          catcherUrl: token.catcherUrl
        };
      }
    }
  }

  fc.initer({
    cfg: {
      timer: 1, // Таймер проверки токенов. Одна единица = 1 день
      malRetry: {try:0, max:3}, // Количество повторных попыток запросов на MAL
      textMatch: {percents:95, summ:5},
      sitesImport: false,
      theme: 'theme-dark'
    },
    sites: [ // Список поддерживаемых сайтов
      {
        name:'spirit', links: [['animespirit\.ru/anime/rs/series-rus/\\d+', 'anime']], func: {
          path:'#dle-content .content-block',
          pathTitle: '#dle-content .content-block h3',
          divRetry:{max:3},
          timeout: 3000
          // siteType: 'anime'
        },
        main: 'animespirit\.ru'
      },
      {
        name:'joy', links: [['anime-joy\.online/tv-serialy/\\d+', 'anime']], func: {
          path:'#content .titleup',
          pathTitle: '#content .titleup > *:nth-child(2)',
          divRetry:{max:3},
          timeout: 3000
          // siteType: 'anime'
        },
        main: 'anime\-joy\.online'

      },
      {
        name:'mangalib', links: [['mangalib\.me/ru/manga/.+', 'manga']], func: {
          path:'.media-content.paper > div',
          pathTitle: '.page div>h2',
          divRetry:{max:6},
          timeout: 3000
        },
        main: 'mangalib\.me/ru.*',
        spa: true
      }
    ]
  });

})();
