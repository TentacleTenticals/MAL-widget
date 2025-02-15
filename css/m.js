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
  --col-for: rgb(130 232 255);
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
            &.currently_publishing {
              color: var(--col-thi);
              background-color: var(--bck-c-six);
            }
          }
        }

        .-s-item {
          display: flex;
          gap: 0 5px;

          &.hidden {
            display: none;
          }
        }

        .-link {
          text-decoration: none;
        }
      }
    }
  }

  .-itemTitle {
    padding: 0 0 3px 0;
    color: var(--col);
    /* font-family: 'Parkinsans', sans-serif; */
    font-family: 'Faculty Glyphic', sans-serif;
    border: solid var(--bor-c);
    border-width: 0 0 2px 0;
  }

  .-footer {
    display: flex;
    flex-wrap: wrap;
    gap: 5px 7px;

    .status-items {
      flex-grow: 1;
      gap: 0 10px;

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

      .-watchNread {
        display: flex;
        gap: 0 5px;
        padding: 0 10px 0 5px;
        margin: auto 0 auto auto;
        border-radius: 15px;
        color: var(--col);
        font-size: 14px;
        /* background-color: var(--bck-c-for); */
        font-family: "Amarante", serif;
  
          .-num {
            display: flex;
            appearance: none;
            -moz-appearance: textfield;
            padding: 0;
            margin: auto 0 auto 3px;
            min-width: 12px;
            height: unset;
            font-family: "Amarante", serif;
            font-size: 14px;
            line-height: normal;
            color: var(--col-for);
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
            line-height: normal;
            color: var(--col);
  
            &::before {
              display: block;
              content: '/';
            }
          }
  
          .vol {
            &::after {
              content: '|';
              padding: 0 5px 0 10px;
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
    }

    .-more {
      gap: 0 6px;
      width: 100%;

      .label {
        align-items: center;
        gap: 0 3px;
        margin: auto;
        color: var(--col);
        font-family: "Amarante", serif;

        &.-rewatchNreread {
          margin: 0 auto 0 0;
          font-size: 14px;
          font-weight: 400;
        }

        &.-priority {
          margin: 0 0 0 auto;
          font-size: 14px;
          font-weight: 400;
        }
      }

      .-status.-priority {
        display: flex;
        gap: 0 3px;
        padding: 0 10px 0 5px;
        width: auto;
        height: auto;
        font-size: 14px;
        font-family: "Amarante", serif;
        border-radius: 14px;
        color: var(--col);
        background-color: var(--bck-c-for);
  
        .-num {
          display: flex;
          appearance: none;
          -moz-appearance: textfield;
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
    }

    .-status.-rating {
      display: flex;
      gap: 0 1px;
      margin: auto 0 auto 0;
      font-size: 14px;
      font-family: "Amarante", serif;
      border-radius: 14px;
      color: var(--col);

      .flx {
        gap: 0 2px;
      }

      &::after {
        display: block;
        content: '|';
        padding: 0 0 0 4px;
        font-size: 14px;
      }

      .-num {
        display: flex;
        appearance: none;
        -moz-appearance: textfield;
        padding: 0;
        margin: auto;
        min-width: 12px;
        height: unset;
        font-family: "Amarante", serif;
        font-size: 14px;
        line-height: normal;
        color: var(--col-for);
        text-align: center;
        outline: none;
        border: unset;
        border-radius: 14px;
        background-color: unset;

        &::-webkit-inner-spin-button {
          display: none;
        }
      }

      .-max {
        display: flex;
        gap: 0 2px;
        margin: auto;
        line-height: normal;
        
        &::before {
          display: block;
          content: '/';
          font-size: 14px;
        }
      }
    }

    .date-save {
      gap: 0 10px;
      margin-left: auto;

      .-status.-updatedAt {
        display: flex;
        gap: 0 3px;
        margin: auto;
  
        .-num {
          margin: auto;
          font-size: 16px;
          font-family: "Play", sans-serif;
          color: var(--col);
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
}

.mdl {
  padding: 10px;
  margin: auto;

  &::backdrop {
    background-color: rgb(0 0 0 / 0.70);
  }

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
    padding: 5px;
    margin: 10px 0 0 0;
    border: 1px solid rgb(0 0 0);
    border-radius: 3px;
    background-color: rgb(223 223 223);
    overflow: auto;

    .header {
      padding: 5px 0 0 10px;
    }
  }
}
`
