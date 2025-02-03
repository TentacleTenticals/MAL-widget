export const css = () => `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Parkinsans:wght@300..800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Amarante&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap');

.theme-dark {
  --col: rgb(255 255 255);
  --col-sec: rgb(253 53 53);
  --col-thi: rgb(0 0 0);
  --bck-c: rgb(0 0 0);
  --bck-c-sec: rgb(65 65 65);
  --bck-c-thi: rgb(255 255 255);
  --bck-c-for: rgb(65 65 65);
  --bck-c-six: rgb(93 195 154);

  --bor-c: rgb(145 145 145);
  --bor-c-sec: rgb(101 101 101);
}
.theme-light {
  --col: rgb(0 0 0);
  --col-sec: rgb(53 53 53);
  --col-thi: rgb(255 255 255);
  --bck-c: rgb(198 206 233);
  --bck-c-sec: rgb(209 216 225);
  --bck-c-thi: rgb(0 0 0);
  --bck-c-six: rgb(243 206 233);

  --bor-c: rgb(123 122 122);
}

.-mal {
  display: flex;
  flex-direction: column;
  gap: 7px 3px;
  padding: 4px;
  width: auto;
  border: 1px solid rgb(0 0 0);
  border-radius: 3px;
  background-color: var(--bck-c);

  margin-top: 10px;

  > .-header {
    display: flex;
    flex-direction: row;
    gap: 5px 0;

    > .-title {
      padding: 0 10px 0 0;
      margin: -6px 0 0 0;
      width: max-content;
      font-weight: 600;
      font-size: 18px;
      font-family: 'Oswald', sans-serif;
      color: var(--col-sec);
    }

    > .-info {
      display: flex;
      flex-direction: row;
      gap: 10px 5px;

      > .-list {
        display: flex;
        flex-direction: row;
        gap: 0 5px;

        > .-item {
          display: flex;
          flex-direction: row;
          gap: 10px 5px;
          padding: 2px 5px 2px 5px;
          margin: auto;
          font-size: 14px;
          border: 1px solid var(--bor-c);
          border-radius: 13px;
          color: var(--col);
          background-color: var(--bck-c-sec);

          &.-rating {
            font-family: "Amarante", serif;
            /* font-family: "Play", sans-serif; */
          }

          &.-rank {
            font-family: "Amarante", serif;
            /* font-family: "Play", sans-serif; */
          }

          &.-id {
            font-family: "Amarante", serif;
          }

          &.-broadcast {
            &.currently_airing {
              color: var(--col-thi);
              background-color: var(--bck-c-six);
            }
            &.finished_airing {
              display: none;
            }
          }
        }

        .-s-item {
          display: flex;
          gap: 0 5px;
        }

        .-link {
          text-decoration: none;
        }
      }
    }
  }

  .-itemTitle {
    color: var(--col);
    /* font-family: 'Parkinsans', sans-serif; */
    font-family: 'Faculty Glyphic', sans-serif;
  }

  .-footer {
    display: flex;
    gap: 0 7px;

    .-status.-st {
      padding: 2px;
      margin: 0;
      height: unset;
      line-height: normal;
      border: 1px solid rgb(115 115 115);
      border-radius: 3px;
      outline: none;
      color: var(--col);
      background-color: var(--bck-c-for);
    }

    .-status.-episodes {
      display: flex;
      align-items: center;
      gap: 0 5px;
      padding: 2px 10px 2px 5px;
      font-size: 15px;
      border: 1px solid var(--bor-c);
      border-radius: 14px;
      color: var(--col);
            background-color: var(--bck-c);

      .-numbers {
        display: flex;
        padding: 0 10px 0 5px;
        margin: auto;
        border-radius: 15px;
        color: var(--col);
        background-color: var(--bck-c-for);
        font-family: "Amarante", serif;

        .-num {
          display: flex;
          appearance: none;
          padding: 0;
          margin: auto 0 auto 3px;
          min-width: 12px;
          height: unset;
          font-family: "Amarante", serif;
          font-size: 14px;
          line-height: normal;
          color: var(--col);
          text-align: center;
          outline: none;
          border: unset;
          border-radius: 2px;
          background-color: unset;

          &::-webkit-inner-spin-button {
            display: none;
          }
        }
        .-max {
          display: flex;
          gap: 0 2px;
          margin: auto;
          font-size: 14px;
          color: var(--col);

          &::before {
            display: block;
            content: '/';
          }
        }
      }

      .-btn.-plus {
        display: flex;
        align-items: center;
        padding: 2px;
        margin: auto 0 auto 5px;
        aspect-ratio: 1/1;
        line-height: 0;
        border: 1px solid var(--bor-c);
        border-radius: 50%;
      }
    }

    .-status.-rating {
      display: flex;
      gap: 0 3px;
      padding: 0 10px 0 5px;
      font-size: 14px;
      font-family: "Amarante", serif;
      border-radius: 14px;
      color: var(--col);
      background-color: var(--bck-c-for);

      .-num {
        display: flex;
        appearance: none;
        padding: 0;
        margin: auto;
        min-width: 12px;
        height: unset;
        font-family: "Amarante", serif;
        font-size: 14px;
        line-height: normal;
        color: var(--col);
        text-align: center;
        outline: none;
        border: unset;
        border-radius: 14px;
        background-color: unset;

        &::-webkit-inner-spin-button {
          display: none;
        }
      }
    }

    .-btn.-save {
      font-family: "Play", sans-serif;
      font-weight: 600;
      border: 1px solid var(--bor-c);
      border-radius: 2px;
      color: var(--col-thi);
      background-color: var(--bck-c-thi);

      &:hover {
        filter: brightness(0.8);
        cursor: pointer;
      }
    }
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

  .helper {
    margin: 10px 0 0 0;
    border: 1px solid rgb(0 0 0);
    border-radius: 3px;
    background-color: rgb(223 223 223);

    .header {
      padding: 5px 0 0 10px;
    }
  }
}
`
