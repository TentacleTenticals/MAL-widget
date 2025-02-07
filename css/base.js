export const mainCss = () => `
.flx {
  display: flex;

  &.hor {
    flex-direction: row;
  }
  &.ver {
    flex-direction: column;
  }
}

.inline {
  div, a {
    display: inline;
  }
}
`
