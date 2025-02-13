
        El.Div({
          path: i.path,
          class: i.class,
          text: i.text,
          func: (r) => {
            El.Div({
              path: r,
              class: i.c.class,
              text: i.c.text,

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

                      });
                      El.Div({
                        path: b,
                        class: '-s-item hidden',
                        func: (i) => {
                          el.header.broadcastDate = i;
                          El.Div({
                            path: i,
                            class: '-value -day',

                          });
                          El.Div({
                            path: i,
                            class: '-value -time',

                    path: i,
                    class: '-item -rating',
                    text: 'Rating',
                    c: {
                      class: '-value',

                    path: i,
                    class: '-item -rank',
                    text: 'Rank',
                    c: {
                      class: '-value',

                  El.A({
                    path: i,
                    class: '-link',
                    text: '🔗',
                    url: o.s.main.url,
                    target: '__blank',

                      path: num,
                      class: '-num',
                      type: 'number',
                      label: 'eps',
                      lClass: 'flx',
                      min: 0,
                      max: el.footer.epsNum,
                      pattern: '[0-9]{2}',
                      onblur: (e) => {

                          path: e.parentNode,
                          class: '-btn -plus',
                          text: '+',
                          onclick: () => {
                            o.s.me.eps++;

                      path: num,
                      class: '-num',
                      type: 'number',
                      label: 'vol',
                      lClass: 'flx vol',
                      min: 0,
                      max: el.footer.volumesNum,
                      pattern: '[0-9]{2}',
                      onblur: (e) => {

                          path: e.parentNode,
                          class: '-btn -plus',
                          text: '+',
                          onclick: () => {
                            o.s.me.volumes++;

                      path: num,
                      class: '-num',
                      type: 'number',
                      label: 'chp',
                      lClass: 'flx',
                      min: 0,
                      max: el.footer.chaptersNum,
                      pattern: '[0-9]{2}',
                      onblur: (e) => {

                          path: e.parentNode,
                          class: '-btn -plus',
                          text: '+',
                          onclick: () => {
                            o.s.me.chapters++;
                          }
                        });
                      }
                    });
                  }
                });
              }

                    min: 0,
                    max: 10,
                    pattern: '[0-9]{2}',
                    onblur: (e) => {

}
