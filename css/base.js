export const baseCSS = () => `
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

.scrol {
  &::-webkit-scrollbar-corner {
    background-color: unset;
  }

  &.lite::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }
  &.mid::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  &.big::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
}
`
