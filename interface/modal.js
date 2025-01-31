El.Div({
  path: document.body,
  class: 'modal',
  show: true,
  func: (d) => {
    const info = {
      url: 'https://myanimelist.net/v1/oauth2/authorize?'
    };
    const params = {
      'response_type': 'code',
      'client_id': secrets.id1,
      'redirect_uri': 'https://tentacletenticals.github.io/Redictoryus/fallback',
      'code_challenge': Mal.cc(128)
    };
    const params2 = {
      grant_type: 'authorization_code',
      'client_id': secrets.id1,
      'client_secret': secrets.sec,
      'redirect_uri': params.redirect_uri,
      code_verifier: params.code_challenge
    };
    const el = {};

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
        text: 'Сгенерированы варки. Введите данные во вкладке скрипта [Данные] и перезагрузите страницу'
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
        func: (e) => el.code = e,
        onclick: () => {
          el.w = window.open(info.url+new URLSearchParams(params));
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
            func: (e) => el.btn = e,
            onclick: () => {
              let tokens;
      
              Mal.getToken({
                data: {
                  // grant_type: 'authorization_code',
                  // code_verifier: params.code_challenge,
                  ...params2
                }
              }).then(
                res => {
                  console.log('RES', res);
                  tokens = res;
                },
                err => {
                  console.log('ERR', err);
                  tokens = {};
                }
              )
            }
          });
        }
      })

      El.Lt({
        path: l,
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
        path: l,
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

    window.addEventListener('message', (e) => {
      if(e.data.type && e.data.type === 'PREVIEW_INSTANTIATE_DIFF') return;
      console.log('Message from c!', e.data);
      console.log('ELL', el)
      if(e.data.code){
        el.MSG.textContent = 'Код получен. Нажмите на кнопку выше для получения токенов';
        params2.code = e.data.code;

        el.w?.postMessage({MSG:'Код получен, данная вкладка будет закрыта через 5 секунд'}, '*');
        el.code.disabled = true;
        el.btn.disabled = false;
        setTimeout(() => {
          el.w && el.w?.postMessage({type:'close'}, '*');
        }, 5000);
      }
    });
  }
})
