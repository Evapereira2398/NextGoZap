import styled from "styled-components";


export const Layout = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  overflow: hidden;

  justify-content: center;
  align-items: center;
  position: relative;

  .close-item {
    position: absolute;
    top: 2em;
    right: 2em;

    cursor: pointer;
  }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  .container-session {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    #left-div {
      width: 60%;
      height: 100vh;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      background: #F8F8F8;

    h1 {
      color: #030712;     
      text-align: center;
      font-size: 36px;
      font-style: normal;
      font-weight: 700;
      margin-bottom: 5px;
      line-height: 40px; /* 111.111% */
    }

    p {
      color: var(--body, #404040);
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
    }

      img {
        width: 450px;
        height: 450px;
        object-fit: contain;
      }
    }

    #right-div {
      width: 40%;
      height: 100vh;
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 2em;
    }
  }
`;


export const Title = styled.h1`
  text-align: center;
  display: flex;      
  flex-direction: column;
  justify-content: center; 
  margin-bottom: 20px;
  color: #444;

  p {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    margin: 0;
    padding: 5px 0;
  }
`;

export const ImageCustom = styled.img`
  width: 250px;
  height: 250px;
  padding: 10px;
  object-fit: cover;
  margin: 0 auto;
  border: 2px solid #EAB308;
  border-radius: 10px;
`;

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;

  small {
    font-size: 12px;
    font-weight: bold;
  }
  
  .top-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2em;
    margin-bottom: 5px;
    margin-left: 45px;
  }

  input {
    background: #fff;
    border: 2px solid #737373;
    border-radius: 8px;
    outline: 0;
    padding: 10px;
    width: 300px;
    height: 50px;
    margin-left: 45px; 
  }

  .esqueceu-senha {
    display: flex; 
    justify-content: flex-end;
    margin-top: 10px;
    margin-bottom: 30px;

    #pass {
      color: #4666F7;
      border-bottom: 1px solid #4666F7;
      cursor: pointer;
      margin-right: 45px;
      font-size: 13px;
      font-style: normal;
      font-weight: 300;
    }
  }

  #send-btn {
    background: #EAB308;
    padding: 10px 25px;
    border: 0;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    font-weight: 700;
    outline: 0;
    cursor: pointer;
    transition-duration: 200ms;
    margin-top: 1em;
    border-radius: 8px;
    width: 300px;
    height: 40px;
    margin-left: 45px;

    &:hover {
      background: #d9a93f;
    }

    &:disabled {
      background: #5b5e78;
      cursor: not-allowed;
    }
  }

  #new-account {
    background: none;
    padding: 10px 25px;
    border: 0;
    color: #000;
    font-weight: bold;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition-duration: 200ms;
    margin-top: 1em;
    border-radius: 8px;
    width: 300px;
    height: 40px;
    margin-left: 45px;
    border: 2px solid #EAB308;

    &:hover {
      background: #fff;
    }
  }
`;