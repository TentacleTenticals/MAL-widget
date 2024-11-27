export function build(El, body, Mal, data, s, me){
  El.Div({
    path: body,
    insert: 'beforeend',
    cName: '-mal',
    func: (m) => {
      const el = {
        header: {},
        footer: {}
      };
      function item(o){
        El.Div({
          path: o.path,
          cName: o.cName,
          text: o.text,
          func: (r) => {
            El.Div({
              path: r,
              cName: o.c.cName,
              text: o.c.text,
              func: o.c.func
            });
          }
        });
      };
  
      El.Div({
        path: m,
        cName: '-header',
        func: (h) => {// m 0
          const handler = {
            set(target, key, value, receiver) {
              if (value !== target[key]) {
                console.log(`Setting ${key} to ${value}`);
                target[key] = value;
                upd(key, value);
                return true;
              }
              return false;
            }
          };
          s.main = new Proxy(data.main, handler);
          // const el = {};
      
          function upd(key, v){
            switch(key){
              case 'title': el.title.textContent = v;
              break;
              case 'status': el.header.broadcast.classList.add(v);
              break;
              case 'weekDay': el.header.weekDay.textContent = Mal.wD(v, true);
              break;
              case 'weekTime': el.header.weekTime.textContent = 'в '+v;
              break;
              case 'rating': el.header.rating.textContent = v;
              break;
              case 'id': el.header.id.textContent = v;
              break;
              case 'url': el.header.url.href = v;
              break;
              case 'epsNum': el.footer.epsNum.textContent = v;
              break;
            }
          }
  
          El.Div({//h 0
            path: h,
            cName: '-title',
            text: 'MAL'
          });
  
          El.Div({//h 1
            path: h,
            cName: '-info',
            func: (info) => {
              El.Div({//info 0
                path: info,
                cName: '-list',
                // text: 'Info',
                func: (i) => {
                  El.Div({
                    path: i,
                    cName: '-item -broadcast',
                    func: (b) => {
                      el.header.broadcast = b;
                      El.Div({
                        path: b,
                        cName: '-title',
                        text: 'Выходит по'
                      });
                      El.Div({
                        path: b,
                        cName: '-s-item',
                        func: (i) => {
                          El.Div({
                            path: i,
                            cName: '-value -day',
                            text: '-',
                            func: (e) => {
                              el.header.weekDay = e;
                            }
                          });
                          El.Div({
                            path: i,
                            text: '-',
                            cName: '-value -time',
                            func: (e) => {
                              el.header.weekTime = e;
                            }
                          });
                        }
                      });
                    }
                  });
  
                  item({//i 0
                    path: i,
                    cName: '-item -rating',
                    text: 'Rating',
                    c: {
                      cName: '-value',
                      func: (e) => {
                        el.header.rating = e;
                      }
                    }
                  });
      
                  item({//i 1
                    path: i,
                    cName: '-item -id',
                    text: 'MAL ID',
                    c: {
                      cName: '-value',
                      func: (e) => {
                        el.header.id = e;
                      }
                    }
                  });
  
                  El.A({
                    path: i,
                    cName: '-link',
                    text: '🔗',
                    url: s.main.url,
                    target: '__blank',
                    func: (e) => {
                      el.header.url = e;
                    }
                  });
                }
              });
            }
          });
        }
      });
  
      El.Div({//m 1
        path: m,
        cName: '-itemTitle',
        text: '-',
        func: (e) => {
          el.title = e;
        }
      });
  
      El.Div({//m 2
        path: m,
        cName: '-footer',
        func: (f) => {
          const handler = {
            set(target, key, value, receiver) {
              if (value !== target[key]) {
                console.log(`Setting ${key} to ${value}`);
                target[key] = value;
                upd(key, value);
                return true;
              }
              return false;
            }
          };
          s.me = new Proxy(data.me, handler);
  
          function upd(key, value){
            switch(key){
              case 'status': el.footer.status.value = value;
              break;
              case 'eps': el.footer.eps.value = value;
              break;
              case 'rating': el.footer.rating.value = value;
              // case 'epNum': s.children[1].children[1].textContent = value;
              // break;
            }
          }
  
          El.Select({//s 0
            path: f,
            cName: '-status -st',
            options: [
              ['-', undefined],
              ['watching', 'watching'],
              ['completed', 'completed'],
              ['on hold', 'on_hold'],
              ['dropped', 'dropped'],
              ['plan to watch', 'plan_to_watch']
            ],
            // value: d.status,
            onchange: (e) => {
              s.me.status = e.target.value;
            },
            func: (e) => {
              el.footer.status = e;
              console.log(el.footer.status)
            }
          });
          El.Div({//s 1
            path: f,
            cName: '-status -episodes',
            func: (n) => {
              El.Div({
                path: n,
                cName: '-numbers',
                func: (num) => {
                  El.Input({//n 0
                    path: num,
                    cName: '-num',
                    type: 'number',
                    min: 0,
                    max: el.footer.epsNum,
                    pattern: '[0-9]{2}',
                    onblur: (e) => {
                      if(s.me.eps === e.target.value) return;
                      s.me.eps = e.target.value;
                      e.target.style.width = `${e.target.value.length*7}px`;
                    },
                    oninput: (e) => {
                      e.target.style.width = `${e.target.value.length*7}px`;
                    },
                    func: (e) => {
                      e.style.width = `${s.me.eps.length*7}px`;
                      el.footer.eps = e;
                    }
                  });
                  El.Div({
                    path: num,
                    cName: '-max',
                    // text: d.epNum,
                    func: (e) => {
                      el.footer.epsNum = e;
                    }
                  });
                }
              });
  
              El.Button({//n 2
                path: n,
                cName: '-btn -plus',
                text: '+',
                onclick: () => {
                  s.me.eps++;
                }
              });
  
              El.Div({//n 0
                path: n,
                cName: '-status -rating',
                text: 'My rating',
                func: (num) => {
                  El.Input({//n 0
                    path: num,
                    cName: '-num',
                    // editable: true,
                    type: 'number',
                    min: 0,
                    max: 10,
                    pattern: '[0-9]{2}',
                    onblur: (e) => {
                      if(s.me.rating === e.target.value) return;
                      s.me.rating = e.target.value;
                      e.target.style.width = `${e.target.value.length*7}px`;
                    },
                    oninput: (e) => {
                      e.target.style.width = `${e.target.value.length*7}px`;
                    },
                    func: (e) => {
                      e.style.width = `${s.me.rating.length*7}px`;
                      el.footer.rating = e;
                    }
                  });
                }
              });
            }
          });
  
          El.Button({//n 3
            path: f,
            cName: '-btn -save',
            text: 'Save',
            onclick: () => {
              document.activeElement.blur();
              Mal.updateList({
                value: s.main.id,
                type: 'anime',
                data: {
                  status: s.me.status,
                  // score: 10,
                  // num_episodes_watched: 24,
                  num_watched_episodes: s.me.eps
                }
              }).then(
                l => {
                  console.log('Upd', l);
                }
              )
            }
          });
        }
      })
    }
  })
}
