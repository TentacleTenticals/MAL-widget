export const css = () => {
  return `
  body {
  margin: unset;
}

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
  /* display: flex; */

  div, a {
    display: inline;
  }
  /* white-space: break-spaces; */

  /* &::before {
    content: '*';
    padding: 0 5px 0 0;
  } */
}

.startModal {
  position: absolute;
  top: 0;
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

.helper {
  gap: 3px 0;
  padding: 0 0 0 10px;

  .list {
    gap: 3px 0;
    padding: 5px 0 0 10px;
    margin: 0 0 0 10px;
    border: 1px solid rgb(0 0 0);
    background-color: rgb(220 220 220);
  }
}

.item {
  &::before {
    content: '*';
    padding: 0 5px 0 0;
  }

  a, div {
    display: inline;
  }
}

.m.header {
  padding: 5px;
  font-size: 30px;
  text-align: center;
  background-color: rgb(0 0 0);
  color: rgb(255 255 255);
}

.mainer {
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  padding: 10px;
  width: max-content;

  label {
    display: flex;
    gap: 0 5px;
    margin: 0 0 0 auto;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  padding: 10px;
  border: 1px solid rgb(0 0 0);
  border-radius: 3px;

  &.main {
    background-color: rgb(200 220 240);
  }

  &.tokens {
    background-color: rgb(255 220 240);

    .btn {
      border: 1px solid rgb(0 0 0);
      border-radius: 3px;
      
      &.tokens {
        background-color: rgb(200 210 120);
      }
      &.hidden {
        display: none;
      }
    }
  }
}
`
}
