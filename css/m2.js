export const css = () => {
  return `@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Parkinsans:wght@300..800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap');

.-mal {
  display: flex;
  flex-direction: column;
  gap: 7px 3px;
  padding: 4px;
  width: max-content;
  border: 1px solid rgb(0 0 0);
  border-radius: 3px;
  background-color: rgb(198 206 233);

  margin-top: 10px;

  >.-header {
    display: flex;
    flex-direction: row;
    gap: 5px 0;

    >.-title {
      padding: 0 10px 0 0;
      margin: -6px 0 0 0;
      width: max-content;
      font-weight: 600;
      font-size: 18px;
      font-family: "Oswald", sans-serif;
      color: rgb(53 53 53);
    }

    >.-info {
      display: flex;
      flex-direction: row;
      gap: 10px 5px;

      >.-list {
        display: flex;
        flex-direction: row;
        gap: 0 5px;

        >.-item {
          display: flex;
          flex-direction: row;
          gap: 10px 5px;
          padding: 2px 5px 2px 5px;
          margin: auto;
          font-size: 14px;
          border: 1px solid rgb(123 122 122);
          border-radius: 13px;
          background-color: rgb(209 216 225);
        }

        .-link {
          text-decoration: none;
        }
      }
    }
  }

  .-itemTitle {
    font-family: "Parkinsans", sans-serif;
    font-family: "Faculty Glyphic", sans-serif;
  }

  .-footer {
    display: flex;
    gap: 0 7px;

    .-status.-st {
      padding: 2px;
      margin: 0;
      height: unset;
      line-height: 0;
    }

    .-status.-episodes {
      display: flex;
      align-items: center;
      gap: 0 5px;
      padding: 2px 10px 2px 5px;
      font-size: 15px;
      border: 1px solid rgb(123 122 122);
      border-radius: 14px;

      .-numbers {
        display: flex;
        padding: 0 10px 0 5px;
        margin: auto;
                color: rgb(255 255 255);
                border-radius: 15px;
                background-color: rgb(0 0 0);
      
        .-num {
          display: flex;
          appearance: none;
          padding: 0;
          margin: auto;
          min-width: 20px;
          height: unset;
          font-size: 12px;
          line-height: 0;
          color: rgb(255 255 255);
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
          font-size: 12px;
          color: rgb(255 255 255);

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
        margin: auto;
        aspect-ratio: 1/1;
        line-height: 0;
        border: 1px solid rgb(0 0 0);
        border-radius: 50%;
    }
    }

    .-status.-rating {
      display: flex;
      gap: 0 5px;
      padding: 0 0 0 0;

      .-num {
        display: flex;
        appearance: none;
        padding: 0;
        margin: auto;
        min-width: 15px;
        height: unset;
        line-height: 0;
        color: rgb(255 255 255);
        text-align: center;
        outline: none;
        border: unset;
        border-radius: 2px;
        background-color: rgb(0 0 0);
  
        &::-webkit-inner-spin-button {
          display: none;
        }
      }
  }

    .-btn.-ok {
      border: 1px solid rgb(0 0 0);
      border-radius: 2px;
  }
  }
}`
}
