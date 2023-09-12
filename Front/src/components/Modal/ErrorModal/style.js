import styled from "styled-components";

export const ModalContainer = styled.div`
  background: #E9E9E9;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  color: #000;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 3em;
  }

  .middle-section {
    display: flex;
    flex-direction: column;
    padding: 1em 2em;
    text-align: center;

    h2 {
      font-weight: 500;
      margin-bottom: 10px;
      font-size: 20px;
    }

    p {
      margin-top: 10px;
      font-size: 15px;
    }

    a {
      color: #000;
      margin-top: 10px;
      cursor: pointer;
    }
  }

  .bottom-section {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      background: transparent;
      border: 1px solid #737373;
      color: #030712;
      width: 30%;
      border-radius: 8px;
      text-decoration: none;
      padding: 10px 20px;
      margin: 0 10px;
      margin-bottom: 10px;
      
      font-weight: 500;
      text-transform: uppercase;
      outline: 0;
      cursor: pointer;

      &:hover {
        background-color: #EAB308;
        color: #ffffff;
      }
    }
  }
`;