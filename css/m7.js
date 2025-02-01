export const css = () => `
.flex {
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

.startModal {
  position: absolute;
  top: 0;

  padding: 10px;

  .m-header {
    text-align: center;
  }
}

.modal {
  padding: 10px;

  .m-header {
    text-align: center;
  }

  .msg {
    text-align: center;
    font-weight: 600;
  }

  .m-list {
    gap: 5px 0;
  }
}
`
