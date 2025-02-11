export function tokenModal(El, Mal, o){
  return El.Dialog({
    path: document.body,
    class: 'modal',
    show: true,
    onclose: (d) => {
      // d.remove();
      o.onclose && o.onclose();
    },
    func: (d) => {
      const chall = Mal.cc(128);
      const el = {};

      // setTimeout(() => {
      //   d.close(d, 'test');
      // }, 1000)

      // d.close('test');

      El.Div({
        path: d,
        class: 'm-header',
        text: '[MAL Widget]'
      });
      
      El.Div({
        path: d,
        class: 'm-list flex ver',
        func: (l) => {
      
        El.Div({
          path: l,
          class: 'txt',
          text: 'Требуются токены'
        });

        El.Lt({
          path: l,
          class: 'inline',
          items: [
            {
              type: 'item',
              items: [
                {
                  type: 'div',
                  text: 'Вы можете создать MAL приложение по '
                },
                {
                  type: 'link',
                  text: 'ссылке',
                  url: 'https://myanimelist.net/apiconfig'
                }
              ]
            }
          ]
        });

        El.Button({
          path: l,
          text: 'Войти в аккаунт MAL и получить код',
          func: (e) => el.btnLogin = e,
          onclick: () => {
            el.w = window.open(Mal.loginGen({
              ...o.secrets,
              codeChall: chall
            }));
          }
        });

        El.Div({
          path: l,
          class: 'flex ver',
          func: (tk) => {
            El.Div({
              path: l,
              class: 'msg',
              text: 'Войдите в аккаунт MAL, нажав кнопку выше',
              func: (e) => el.MSG = e
            });
            
            El.Button({
              path: tk,
              class: 'btn tokens',
              text: 'Получить токены',
              disabled: true,
              func: (e) => el.btnToken = e,
              onclick: () => {

                return Mal.getToken({
                  url: o.secrets?.catcherUrl,
                  ...o.secrets,
                  codeVer: chall,
                  // code: o.secrets.code
                }).then(
                  async res => {
                    console.log('[MAL Widget] Токены получены!');
                    el.MSG.textContent = 'Токены получены';
                    el.btnToken.disabled = true;
                    // if(o.gm){
                    //   // await o.gm.setValue('token', res.access_token);
                    //   // await o.gm.setValue('refresh_token', res.refresh_token);
                    //   // await o.gm.setValue('date', Date.parse(new Date));
                    //   d.close();
                    // };
                    d.close();
                    return o.promise[0](res);
                  },
                  err => {
                    console.log('[MAL Widget ERR] Токены не получены!', err);
                    return o.promise[1](err);
                  }
                );
              }
            });
          }
        })

        El.Div({
          path: d,
          class: 'helper',
          func: (h) => {
            El.Div({
              path: h,
              class: 'header',
              text: 'Справка'
            });

            El.Lt({
              path: h,
              items: [
                {
                  class: 'inline',
                  items: [
                    {
                      type: 'div',
                      text: '"catcher_url" используется для получения и передачи запросов на MAL. Вы можете захостить его на'
                    },
                    {
                      type: 'list',
                      class: 'inline',
                      items: [
                        {
                          items: [
                            {
                              type: 'link',
                              text: 'Cloudflare Workers',
                              url: 'https://workers.cloudflare.com'
                            }
                          ]
                        },
                        {
                          items: [
                            {
                              type: 'link',
                              text: 'Glitch',
                              url: 'https://glitch.com'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },

                {
                  class: 'inline',
                  items: [
                    {
                      type: 'div',
                      text: 'Github проекта "catcher_url"'
                    },
                    {
                      type: 'list',
                      class: 'inline',
                      items: [
                        {
                          items: [
                            {
                              type: 'link',
                              text: 'Cloudflare Workers',
                              url: 'https://github.com/TentacleTenticals/Cloudflare-reverse-catcher'
                            }
                          ]
                        },
                        {
                          items: [
                            {
                              type: 'link',
                              text: 'Glitch',
                              url: 'https://github.com/TentacleTenticals/Express-catcher'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  text: 'Рекомендую Cloudflare Workers, т.к. срабатывают почти мгновенно, в то время как проекты на Glitch "засыпают" после нескольких минут не активности, и для "пробуждения" им требуется несколько секунд'
                }
              ]
            });

            El.Lt({
              path: h,
              items: [
                {
                  text: '"client_id" и "client_secret" берутся из созданного вами приложения'
                },
                // {
                //   text: 'qq ',
                //   link: {
                //     type: 'link',
                //     text: 'Redictoryous1',
                //     url: 'https://github.com/TentacleTenticals/Redictoryus'
                //   }
                // },
                {
                  text: '"redirect_url" это ссылка на сайт, который будет обрабатывать запросы на получение/обновление токенов',
                  items: [
                    {
                      type: 'list',
                      items: [
                        {
                          class: 'inline',
                          items: [
                            {
                              type: 'div',
                              text: 'Github '
                            },
                            {
                              type: 'link',
                              text: 'Redictoryous',
                              url: 'https://github.com/TentacleTenticals/Redictoryus'
                            },
                            {
                              type: 'list',
                              items: [
                                {
                                  text: 'Просто скопируйте проект, включите в настройках "Github Pages", и вы получите свой личный "redirect_uri"'
                                }
                              ]
                            }
                          ]
                        },
                        {
                          class: 'inline',
                          items: [
                            {
                              type: 'div',
                              text: 'Сайт '
                            },
                            {
                              type: 'link',
                              text: 'Redictoryous',
                              url: 'https://tentacletenticals.github.io/Redictoryus/'
                            },
                            {
                              type: 'list',
                              items: [
                                {
                                  text: 'Вы можете использовать этот сайт в качестве "redirect_uri"'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            });
          }
        });

        }
      });

      window.addEventListener('message', (e) => {
        if(e.data.type && e.data.type === 'PREVIEW_INSTANTIATE_DIFF') return;
        console.log('Message from c!', e.data);
        console.log('ELL', el)
        if(e.data.code){
          el.MSG.textContent = 'Код получен. Нажмите на кнопку выше для получения токенов';
          o.secrets.code = e.data.code;

          el.w?.postMessage({MSG:'Код получен, данная вкладка будет закрыта через 5 секунд'}, '*');
          el.btnLogin.disabled = true;
          el.btnToken.disabled = false;
          setTimeout(() => {
            el.w && el.w?.postMessage({type:'close'}, '*');
          }, 5000);
        }
      });
    }
  })
}
