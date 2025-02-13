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

  }

  .-footer {
    display: flex;

        .-num {
          display: flex;
          appearance: none;
          padding: 0;

          min-width: 12px;
          height: unset;
          font-family: "Amarante", serif;
          font-size: 14px;
          line-height: normal;
          color: var(--col);
          text-align: center;
          outline: none;
          border: unset;

          &::-webkit-inner-spin-button {
            display: none;
          }
        }

      }
    }

    .-status.-rating {
      display: flex;

      font-size: 14px;
      font-family: "Amarante", serif;
      border-radius: 14px;
      color: var(--col);


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

        text-align: center;
        outline: none;
        border: unset;
        border-radius: 14px;
        background-color: unset;

        &::-webkit-inner-spin-button {
          display: none;
        }
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

`
