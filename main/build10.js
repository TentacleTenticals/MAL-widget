export function build(El, Mal, o){
  El.Div({
    path: o.path,
    insert: 'beforeBegin',
    class: `-mal ${o.theme}`,
    func: (m) => {
      const el = {
        header: {},
        footer: {}
      };
      function item(i){
        El.Div({
          path: i.path,
          class: i.class,
          text: i.text,
          func: (r) => {
            El.Div({
              path: r,
              class: i.c.class,
              text: i.c.text,
              func: i.c.func
            });
          }
        });
      };
  
      El.Div({
        path: m,
        class: '-header',
        func: (h) => {// m 0
          const handler = {
            set(target, key, value, receiver) {
              if (value !== target[key]) {
                // console.log(`Setting ${key} to ${value}`);
                target[key] = value;
                upd(key, value);
                return true;
              }
              return false;
            }
          };
          o.s.main = new Proxy(o.data.main, handler);
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
              case 'rank': el.header.rank.textContent = '# '+v;
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
            class: '-title',
            text: 'MAL'
          });
  
          El.Div({//h 1
            path: h,
            class: '-info',
            func: (info) => {
              El.Div({//info 0
                path: info,
                class: '-list',
                // text: 'Info',
                func: (i) => {
                  El.Div({
                    path: i,
                    class: '-item -broadcast',
                    func: (b) => {
                      el.header.broadcast = b;
                      El.Div({
                        path: b,
                        class: '-title',
                        text: 'Выходит по'
                      });
                      El.Div({
                        path: b,
                        class: '-s-item',
                        func: (i) => {
                          El.Div({
                            path: i,
                            class: '-value -day',
                            text: '-',
                            func: (e) => {
                              el.header.weekDay = e;
                            }
                          });
                          El.Div({
                            path: i,
                            text: '-',
                            class: '-value -time',
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
                    class: '-item -rating',
                    text: 'Rating',
                    c: {
                      class: '-value',
                      func: (e) => {
                        el.header.rating = e;
                      }
                    }
                  });

                  item({//i 0
                    path: i,
                    class: '-item -rank',
                    text: 'Rank',
                    c: {
                      class: '-value',
                      func: (e) => {
                        el.header.rank = e;
                      }
                    }
                  });
      
                  item({//i 1
                    path: i,
                    class: '-item -id',
                    text: 'MAL ID',
                    c: {
                      class: '-value',
                      func: (e) => {
                        el.header.id = e;
                      }
                    }
                  });
  
                  El.A({
                    path: i,
                    class: '-link',
                    text: '🔗',
                    url: o.s.main.url,
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
        class: '-itemTitle',
        text: '-',
        func: (e) => {
          el.title = e;
        }
      });
  
      El.Div({//m 2
        path: m,
        class: '-footer',
        func: (footer) => {
          const handler = {
            set(target, key, value, receiver) {
              if (value !== target[key]) {
                // console.log(`Setting ${key} to ${value}`);
                target[key] = value;
                upd(key, value);
                return true;
              }
              return false;
            }
          };
          o.s.me = new Proxy(o.data.me, handler);
  
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
            path: footer,
            class: '-status -st',
            options: [
              ['-', undefined],
              ['смотрю', 'watching'],
              ['просмотрено', 'completed'],
              ['приостановлено', 'on_hold'],
              ['брошено', 'dropped'],
              ['планирую посмотреть', 'plan_to_watch']
            ],
            // value: d.status,
            onchange: (e) => {
              o.s.me.status = e.target.value;
            },
            func: (e) => {
              el.footer.status = e;
              console.log(el.footer.status)
            }
          });
          El.Div({//s 1
            path: footer,
            class: '-status -episodes',
            func: (n) => {
              El.Div({
                path: n,
                class: '-numbers',
                text: 'Eps',
                func: (num) => {
                  El.Input({//n 0
                    path: num,
                    class: '-num',
                    type: 'number',
                    min: 0,
                    max: el.footer.epsNum,
                    pattern: '[0-9]{2}',
                    onblur: (e) => {
                      if(o.s.me.eps === e.target.value) return;
                      o.s.me.eps = e.target.value;
                      e.target.style.width = `${e.target.value.length*8}px`;
                    },
                    oninput: (e) => {
                      e.target.style.width = `${e.target.value.length*8}px`;
                    },
                    func: (e) => {
                      e.style.width = `${o.s.me.eps.length*8}px`;
                      el.footer.eps = e;
                    }
                  });
                  El.Div({
                    path: num,
                    class: '-max',
                    // text: d.epNum,
                    func: (e) => {
                      el.footer.epsNum = e;
                    }
                  });

                  El.Button({//n 2
                    path: num,
                    class: '-btn -plus',
                    text: '+',
                    onclick: () => {
                      o.s.me.eps++;
                    }
                  });
                }
              });
  
              El.Div({//n 0
                path: n,
                class: '-status -rating',
                text: 'My rating',
                func: (num) => {
                  El.Input({//n 0
                    path: num,
                    class: '-num',
                    // editable: true,
                    type: 'number',
                    min: 0,
                    max: 10,
                    pattern: '[0-9]{2}',
                    onblur: (e) => {
                      if(o.s.me.rating === e.target.value) return;
                      o.s.me.rating = e.target.value;
                      e.target.style.width = `${e.target.value.length*8}px`;
                    },
                    oninput: (e) => {
                      e.target.style.width = `${e.target.value.length*8}px`;
                    },
                    func: (e) => {
                      e.style.width = `${o.s.me.rating.length*8}px`;
                      el.footer.rating = e;
                    }
                  });
                }
              });
            }
          });
  
          El.Button({//n 3
            path: footer,
            class: '-btn -save',
            text: 'Save',
            onclick: () => {
              document.activeElement.blur();
              Mal.updateList({
                value: o.s.main.id,
                type: o.type,
                url: o.url,
                token: o.token,
                data: {
                  status: o.s.me.status,
                  score: o.s.me.rating,
                  num_watched_episodes: o.s.me.eps
                }
              }).then(
                l => {
                  console.log('[MAL Widget] UPD', l);
                }
              )
            }
          });
        }
      })
    }
  })
}
