export const sites = [
  {
    name:'anilib', links: [['anilib\.me/ru/anime/.+', 'anime']], func: {
      path:'.media-content.paper > div',
      pathTitle: '.page div>h2',
      divRetry:{max:6},
      timeout: 3000
    },
    main: 'anilib\.me/ru.*',
    spa: true
  }
]
