export function build(El, Mal, o) {
  El.Div({
    path: o.path,
    insert: 'beforeBegin',
    class: `-mal ${o.theme}`,
    func: (m) => {
      const el = {
        header: {},
        footer: {},
      };
      function item(i) {
        El.Div({
          path: i.path,
          class: i.class,
          text: i.text,
          func: (r) => {
            El.Div({
              path: r,
              class: i.c.class,
              text: i.c.text,
              func: i.c.func,
            });
          },
        });
      }

      El.Div({
        path: m,
        class: '-header',
        func: (h) => {
          // m 0
          const handler = {
            set(target, key, value, receiver) {
              if (value !== target[key]) {
                // console.log(`Setting ${key} to ${value}`);
                target[key] = value;
                upd(key, value);
                return true;
              }
              return false;
            },
          };
          o.s.main = new Proxy(o.data.main, handler);
          // const el = {};

          function upd(key, v) {
            switch (key) {
              case 'title':
                el.title.textContent = v;
                break;
              case 'status':
                el.header.broadcast.classList.add(v);
                break;
              case 'broadcastStatus':
                el.header.broadcastStatus.textContent = v;
                break;
              case 'broadcastDate':
                el.header.broadcastDate.classList.remove('hidden');
                break;
              case 'weekDay':
                el.header.weekDay.textContent = 'по ' + Mal.wD(v, true);
                break;
              case 'weekTime':
                el.header.weekTime.textContent = 'в ' + v;
                break;
              case 'rating':
                el.header.rating.textContent = v;
                break;
              case 'rank':
                el.header.rank.textContent = '# ' + v;
                break;
              case 'id':
                el.header.id.textContent = v;
                break;
              case 'url':
                el.header.url.href = v;
                break;
              case 'epsNum':
                el.footer.epsNum.textContent = v;
                break;
              case 'volumesNum':
                el.footer.volumesNum.textContent = v;
                break;
              case 'chaptersNum':
                el.footer.chaptersNum.textContent = v;
                break;
            }
          }

          El.Div({
            //h 0
            path: h,
            class: '-title',
            text: 'MAL',
          });

          El.Div({
            //h 1
            path: h,
            class: '-info',
            func: (info) => {
              El.Div({
                //info 0
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
                        func: (t) => (el.header.broadcastStatus = t),
                      });
                      El.Div({
                        path: b,
                        class: '-s-item hidden',
                        func: (i) => {
                          el.header.broadcastDate = i;
                          El.Div({
                            path: i,
                            class: '-value -day',
                            func: (e) => {
                              el.header.weekDay = e;
                            },
                          });
                          El.Div({
                            path: i,
                            class: '-value -time',
                            func: (e) => {
                              el.header.weekTime = e;
                            },
                          });
                        },
                      });
                    },
                  });

                  item({
                    //i 0
                    path: i,
                    class: '-item -rating',
                    text: 'Rating',
                    c: {
                      class: '-value',
                      func: (e) => {
                        el.header.rating = e;
                      },
                    },
                  });

                  item({
                    //i 0
                    path: i,
                    class: '-item -rank',
                    text: 'Rank',
                    c: {
                      class: '-value',
                      func: (e) => {
                        el.header.rank = e;
                      },
                    },
                  });

                  item({
                    //i 1
                    path: i,
                    class: '-item -id',
                    text: 'ID',
                    c: {
                      class: '-value',
                      func: (e) => {
                        el.header.id = e;
                      },
                    },
                  });

                  El.A({
                    path: i,
                    class: '-link',
                    text: '🔗',
                    url: o.s.main.url,
                    target: '__blank',
                    func: (e) => {
                      el.header.url = e;
                    },
                  });
                },
              });
            },
          });
        },
      });

      El.Div({
        //m 1
        path: m,
        class: '-itemTitle',
        text: '-',
        func: (e) => {
          el.title = e;
        },
      });

      El.Div({
        //m 2
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
            },
          };
          o.s.me = new Proxy(o.data.me, handler);

          function upd(key, value) {
            switch (key) {
              case 'status':
                el.footer.status.value = value;
                break;
              case 'eps':
                el.footer.eps.value = value;
                break;
              case 'volumes':
                el.footer.volumes.value = value;
                break;
              case 'chapters':
                el.footer.chapters.value = value;
                break;
              case 'rating':
                el.footer.rating.value = value;
                break;
              case 'priority':
                el.footer.priority.value = value;
                break;
              case 'rewatchNreread':
                el.footer.rewatchNreread.checked = value;
                break;
              case 'updatedAt':
                el.footer.updatedAt.textContent = value;
                break;
            }
          }

          El.Div({
            //n 0
            path: footer,
            class: 'flx status-items',
            func: (flx) => {
              El.Select({
                //s 0
                path: flx,
                class: '-status -st',
                options: [
                  ['-', undefined],
                  ...(o.siteType === 'anime') && [
                    ['смотрю', 'watching'],
                    ['просмотрено', 'completed'],
                    ['приостановлено', 'on_hold'],
                    ['брошено', 'dropped'],
                    ['планирую посмотреть', 'plan_to_watch']
                  ]||
                  [
                    ['читаю', 'reading'],
                    ['прочитано', 'completed'],
                    ['приостановлено', 'on_hold'],
                    ['брошено', 'dropped'],
                    ['планирую прочитать', 'plan_to_read']
                  ]
                ],
                // value: d.status,
                onchange: (e) => {
                  o.s.me.status = e.target.value;
                },
                func: (e) => {
                  el.footer.status = e;
                  console.log(el.footer.status);
                },
              });

              if (o.siteType === 'anime') {
                El.Div({
                  path: flx,
                  class: '-watchNread',
                  text: 'Watched',
                  func: (num) => {
                    El.Input({
                      //n VOLUMES NUM
                      path: num,
                      class: '-num',
                      type: 'number',
                      label: 'eps',
                      lClass: 'flx',
                      min: 0,
                      max: el.footer.epsNum,
                      pattern: '[0-9]{2}',
                      onblur: (e) => {
                        if (o.s.me.volumes === e.target.value) return;
                        o.s.me.eps = e.target.value;
                        e.target.style.width = `${e.target.value.length * 8}px`;
                      },
                      oninput: (e) => {
                        e.target.style.width = `${e.target.value.length * 8}px`;
                      },
                      func: (e) => {
                        e.style.width = `${o.s.me.volumes.length * 8}px`;
                        el.footer.eps = e;

                        El.Div({
                          // VOLUMES MAX
                          path: e.parentNode,
                          class: '-max',
                          // text: d.epNum,
                          func: (e) => {
                            el.footer.epsNum = e;
                          },
                        });

                        El.Button({
                          // PLUS
                          path: e.parentNode,
                          class: '-btn -plus',
                          text: '+',
                          onclick: () => {
                            o.s.me.eps++;
                          },
                        });
                      },
                    });
                  },
                });
              }else
              if (o.siteType === 'manga') {
                El.Div({
                  path: flx,
                  class: '-watchNread',
                  text: 'Readed',
                  func: (num) => {
                    El.Input({
                      //n VOLUMES NUM
                      path: num,
                      class: '-num',
                      type: 'number',
                      label: 'vol',
                      lClass: 'flx vol',
                      min: 0,
                      max: el.footer.volumesNum,
                      pattern: '[0-9]{2}',
                      onblur: (e) => {
                        if (o.s.me.volumes === e.target.value) return;
                        o.s.me.volumes = e.target.value;
                        e.target.style.width = `${e.target.value.length * 8}px`;
                      },
                      oninput: (e) => {
                        e.target.style.width = `${e.target.value.length * 8}px`;
                      },
                      func: (e) => {
                        e.style.width = `${o.s.me.volumes.length * 8}px`;
                        el.footer.volumes = e;

                        El.Div({
                          // VOLUMES MAX
                          path: e.parentNode,
                          class: '-max',
                          // text: d.epNum,
                          func: (e) => {
                            el.footer.volumesNum = e;
                          },
                        });

                        El.Button({
                          // PLUS
                          path: e.parentNode,
                          class: '-btn -plus',
                          text: '+',
                          onclick: () => {
                            o.s.me.volumes++;
                          },
                        });
                      },
                    });

                    El.Input({
                      //n VOLUMES NUM
                      path: num,
                      class: '-num',
                      type: 'number',
                      label: 'chp',
                      lClass: 'flx',
                      min: 0,
                      max: el.footer.chaptersNum,
                      pattern: '[0-9]{2}',
                      onblur: (e) => {
                        if (o.s.me.volumes === e.target.value) return;
                        o.s.me.chapters = e.target.value;
                        e.target.style.width = `${e.target.value.length * 8}px`;
                      },
                      oninput: (e) => {
                        e.target.style.width = `${e.target.value.length * 8}px`;
                      },
                      func: (e) => {
                        e.style.width = `${o.s.me.chapters.length * 8}px`;
                        el.footer.chapters = e;

                        El.Div({
                          // VOLUMES MAX
                          path: e.parentNode,
                          class: '-max',
                          // text: d.epNum,
                          func: (e) => {
                            el.footer.chaptersNum = e;
                          },
                        });

                        El.Button({
                          // PLUS
                          path: e.parentNode,
                          class: '-btn -plus',
                          text: '+',
                          onclick: () => {
                            o.s.me.chapters++;
                          },
                        });
                      },
                    });
                  },
                });
              }
            }
          });

          // El.Select({
          //   //s 0
          //   path: footer,
          //   class: '-status -st',
          //   options: [
          //     ['-', undefined],
          //     ...(o.siteType === 'anime') && [
          //       ['смотрю', 'watching'],
          //       ['просмотрено', 'completed'],
          //       ['приостановлено', 'on_hold'],
          //       ['брошено', 'dropped'],
          //       ['планирую посмотреть', 'plan_to_watch']
          //     ]||
          //     [
          //       ['читаю', 'reading'],
          //       ['прочитано', 'completed'],
          //       ['приостановлено', 'on_hold'],
          //       ['брошено', 'dropped'],
          //       ['планирую прочитать', 'plan_to_read']
          //     ]
          //   ],
          //   // value: d.status,
          //   onchange: (e) => {
          //     o.s.me.status = e.target.value;
          //   },
          //   func: (e) => {
          //     el.footer.status = e;
          //     console.log(el.footer.status);
          //   },
          // });

          // El.Div({
          //   //n 0
          //   path: footer,
          //   class: '-status -updatedAt',
          //   text: '⏰',
          //   func: (num) => {
          //     El.Div({
          //       //n 0
          //       path: num,
          //       class: '-num',
          //       func: (e) => {
          //         el.footer.updatedAt = e;
          //       },
          //     });
          //   },
          // });

          
          El.Div({
            //s 1
            path: footer,
            class: 'flx -more',
            func: (n) => {
              El.Div({
                //n 0
                path: n,
                class: '-status -rating',
                text: 'My rating',
                func: (num) => {
                  El.Input({
                    //n 0
                    path: num,
                    class: '-num',
                    // editable: true,
                    type: 'number',
                    min: 0,
                    max: 10,
                    pattern: '[0-9]{2}',
                    onblur: (e) => {
                      if (o.s.me.rating === e.target.value) return;
                      o.s.me.rating = e.target.value;
                      e.target.style.width = `${e.target.value.length * 8}px`;
                    },
                    oninput: (e) => {
                      e.target.style.width = `${e.target.value.length * 8}px`;
                    },
                    func: (e) => {
                      e.style.width = `${o.s.me.rating.length * 8}px`;
                      el.footer.rating = e;
                    },
                  });
                },
              });

              El.Input({
                path: n,
                label: o.siteType === 'anime' ? 'Rewatch' : 'Reread',
                type: 'checkbox',
                lClass: 'flx label -rewatchNreread',
                class: '-status -rewatchNreread',
                onchange: (e) => {
                  o.s.me.rewatchNreread = e.target.checked;
                },
                func: (e) => {
                  el.footer.rewatchNreread = e;
                }
              });

              El.Select({
                path: n,
                label: 'Priority',
                lClass: 'flx label -priority',
                class: '-status -priority',
                options: [
                  ['Low', 0],
                  ['Mid', 1],
                  ['High', 2]
                ],
                onchange: (e) => {
                  o.s.me.priority = e.target.value;
                },
                func: (e) => {
                  el.footer.priority = e;
                }
              });

              // El.Div({
              //   //n 0
              //   path: n,
              //   class: '-status -priority',
              //   text: 'Priority',
              //   func: (num) => {
              //     El.Input({
              //       //n 0
              //       path: num,
              //       class: '-num',
              //       // editable: true,
              //       type: 'number',
              //       min: 0,
              //       max: 2,
              //       pattern: '[0-9]{2}',
              //       onblur: (e) => {
              //         if (o.s.me.priority === e.target.value) return;
              //         o.s.me.priority = e.target.value;
              //         e.target.style.width = `${e.target.value.length * 8}px`;
              //       },
              //       oninput: (e) => {
              //         e.target.style.width = `${e.target.value.length * 8}px`;
              //       },
              //       func: (e) => {
              //         e.style.width = `${o.s.me.rating.length * 8}px`;
              //         el.footer.priority = e;
              //       },
              //     });
              //   },
              // });

              // El.Div({
              //   //n 0
              //   path: n,
              //   class: '-status -updatedAt',
              //   text: '⏰',
              //   func: (num) => {
              //     El.Div({
              //       //n 0
              //       path: num,
              //       class: '-num',
              //       func: (e) => {
              //         el.footer.updatedAt = e;
              //       },
              //     });
              //   },
              // });
            },
          });

          El.Div({
            path: footer,
            class: 'flx date-save',
            func: (sav) => {
              El.Div({
                path: sav,
                class: '-status -updatedAt',
                text: '⏰',
                func: (num) => {
                  El.Div({
                    path: num,
                    class: '-num',
                    func: (e) => {
                      el.footer.updatedAt = e;
                    },
                  });
                },
              });

              El.Button({
                //n 3
                path: sav,
                class: '-btn -save',
                text: 'Save',
                // func: (s) => el.footer.save = s,
                onclick: (s) => {
                  document.activeElement.blur();
                  Mal.updateList({
                    value: o.s.main.id,
                    type: o.siteType,
                    url: o.catcherUrl,
                    accToken: o.accToken,
                    data: {
                      status: o.s.me.status||(o.siteType === 'anime' ? 'watching':'reading'),
                      score: o.s.me.rating,
                      priority: o.s.me.priority,
                      ...(o.siteType === 'anime' && {
                        num_watched_episodes: o.s.me.eps,
                        is_rewatching: o.s.me.rewatchNreread
                      }),
                      ...(o.siteType === 'manga' && {
                        num_volumes_read: o.s.me.volumes,
                        num_chapters_read: o.s.me.chapters,
                        is_rereading: o.s.me.rewatchNreread
                      })
                    },
                  }).then(l => {
                    console.log('[MAL Widget] UPD', l);
                    const time = El.getTime(l?.updated_at, 'full');
                    s.target.textContent = 'Saved ✅';
                    time && (o.s.me.updatedAt = time.date+' '+time.time);
                    setTimeout(() => {
                      s.target.textContent = 'Save';
                    }, 5000);
                  });
                }
              });
            }
          })
        }
      });
    }
  });
}
