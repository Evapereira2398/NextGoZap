import styled from "styled-components";
import { Search, MoreVertical} from "react-feather";

export const Layout = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  clear: both;
  max-height: 100vh;
  
  .emoji-mart.emoji-mart-light {
    position: absolute;
    width: 100% !important;
    left: 0;
    bottom: 120px;
  }

  .emoji-mart {
    position: absolute !important;
    bottom: 60px;
    width: 70vw !important;
    height: 50vh;
    background-color: #f0f0f0;
  }

  .emoji-mart-bar {
    border: 0;
  }

  .emoji-mart-anchors {
    padding: 0;
    border: 0;
  }

  .emoji-mart-anchor-icon {
    color: #a3a3a3;
  }

  .emoji-mart-anchor-selected {
    color: red !important;
  }

  .emoji-mart-anchor-bar {
    background-color: #36aa9f !important;
  }

  .emoji-mart-anchor-icon {
    color: #8b8b8b !important;
  }

  .emoji-mart-search {
    margin: 5px 8px 15px 8px;
  }

  .emoji-mart-search-icon {
    display: none;
  }

  .emoji-mart-search input {
    font-size: 16px;
    display: block;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 0px solid #d9d9d9;
    outline: 0;
    background-color: #e6e6e6;
    color: #4a4a4a;
  }

  .emoji-mart-category-label span {
    display: block;
    width: 100%;
    font-weight: 500;
    padding: 5px 6px;
    color: #b4b4b4;
    background-color: #f0f0f0;
  }

  .emoji-mart-scroll {
    height: 200px;
  }

  .emoji-mart-bar:last-child {
    display: none;
  }

  .emoji-mart {
    position: absolute !important;
    bottom: 60px;
    width: 100vw !important;
    height: 40vh;
  }

  .emoji-mart-category-list {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;
  width: 100%;

  span {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition-duration: 200ms;

    p {
      border-bottom: 1px solid #000;
    }

    svg {
      margin-right: 10px;
    }

    :hover {
      transform: scale(1.1);
    }
  }
`;

export const SessionsContainer = styled.form`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 2em;

  height: 100%;
  width: 20%;
  min-width: 20%;
  position: relative;
  overflow: auto;

  .plus-button {
    position: absolute;
    bottom: 30px;
    right: 30px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;

    border-radius: 50%;
    background: #007af3;
    width: 50px;
    height: 50px;
    cursor: pointer;
    transition-duration: 200ms;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #fff;
      width: 30px;
      height: 30px;
    }

    :hover {
      transform: scale(1.05);
      background: #1065ba;
    }
  }

  ul {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    list-style-type: none;

    li {
      margin-top: 1em;
      width: 100%;

      label {
        input[type="radio"] {
          display: none;
        }

        input[type="radio"]:checked + .info-session {
          background: #f4f6f9;
        }

        .info-session {
          display: flex;
          flex-direction: column;
          cursor: pointer;

          padding: 20px 10px;
          border-radius: 7px;

          border: 1px solid #f4f6f9;
          transition-duration: 200ms;

          :hover {
            transform: scale(1.03);
            background: aliceblue;
          }

          small {
            color: #999;
          }

          p {
            font-weight: 600;
          }
        }
      }
    }
  }
`;

export const HeaderContact = styled.header`
  display: flex;
  padding: 5px;
  border-bottom: 1px solid ${({theme}) => theme.colors.separator};

  background: ${({theme}) => theme.colors.background};

  .container-info-ctt {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 1em;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 15px;
    }

    h3 {
      width: 22%;
      font-weight: 500;
      color: ${({theme}) => theme.colors.name_user};
    }
  }
`;

export const HeaderButton = styled.div`
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 70%;
  margin-left: 120px;
  gap: 10px;


  button {
    align-items: center;

    & > svg {
      width: 18px;
      height: 18px;
      margin-left: 5px;
    }
  }

  #lista {
    width: 100px;
    height: 25px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    background: transparent;
    border: 1px solid #969696;
    border-bottom: none; /* Remove the bottom border when the menu is open */
    border-radius: 8px 8px 0 0; /* Round only the top corners */
    padding: 4px 8px;
    cursor: pointer;
    position: relative; /* To ensure the dropdown appears below the button */
  }
  
  
  #etiqueta {
    width: 120px;
    height: 25px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: transparent;
    font-size: 14px;
    font-weight: bold;
    
    border: 1px solid #969696;
    border-radius: 8px;
    padding: 4px 8px;
    cursor: pointer;
    
    & > svg {
      width: 18px;
      height: 18px;
      margin-right: 5px;
    }
  }

  #finalizar {
    width: 100px;
    height: 25px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: transparent;
    font-size: 14px;
    font-weight: bold;
    border: 1px solid #969696;
    border-radius: 8px;
    padding: 4px 8px;
    cursor: pointer;
  }

  #finalizar .icon {
      width: 15px;
      height: 15px;
      margin-right: -1px;
  }

  #finalizar .text {
  
  }

  #cobranca {
    width: 150px;
    border: none;
    height: 25px;
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    background: #E1A421;
    color: #F0F0F0;
    border-radius: 8px;
    padding: 4px 8px;
    cursor: pointer;
  }

  #cobranca .iconPay {
    width: 19px;
    height: 19px;
  }

  #cobranca .textPay {
    margin-left: -5px;
  }

`;


export const StyledSearch = styled(Search)`
  margin-left: 10px;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const StyledMoreVertical = styled(MoreVertical)`   
  margin-left: 5px;
  margin-right: -15px;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(0deg, rgba(253, 249, 239, 0.50) 0%, rgba(253, 249, 239, 0.50) 100%), url(<path-to-image>), lightgray 0% 0% / 50px 50px repeat;
  //background: ${({theme: {colors}}) => colors.background};

  //background: ${({theme}) => theme.colors.background};

  border-radius: 3px;

  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;

  h3 {
    font-size: 1rem;
  }

  .bottom-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 15px;
    background: #F5F5F5;
    height: 70px;
    border: 2px solid #000;
    border-radius: 8px;

    .left-icons {
      display: flex;
      align-items: center;
      gap: 10px;
        

      button, .icon-container, label {
        background: #EAB308;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        border-radius: 4px;
    }

        img, svg {
          width: 80%;
          height: 80%;
        }

              svg:nth-child(1) {
                color: white; 
              }
          }
      }

    
      label {
        position: relative;
        cursor: pointer;
  
        input[type="file"] {
          display: none;
        }
  
        .attach-info {
          display: flex;
          align-items: center;
          gap: 10px;
    
            .icon-container {
              background: #EAB308;  
              width: 25px; 
              height: 25px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: none;
              cursor: pointer;
              border-radius: 4px;
            }
    
            > img, svg {
              width: 100%;
              height: 100%; 
            }
          } 
        }
  
    .message-input-container {
        flex: 1;
        position: relative;

        textarea {
            margin-top: 15px;
            width: 90%;
            padding: 10px 15px;
            border-radius: 10px;
            outline: 0;
            height: 45px;
            margin-left: 40px;
            transition-duration: 200ms;
            font-size: 14px;
            
            :focus {
              border: 2px solid #EAB308;
            }
        }

        .mic-icon {
            position: absolute;
            top: 54%;
            right: 57px;
            transform: translateY(-50%);
        }
    }

    /* Botão de envio */
    .send-button {
      background: #EAB308;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      display: flex;
      align-items: center;  /* Centraliza verticalmente */
      justify-content: center;  /* Centraliza horizontalmente */
  
      img {
          cursor: pointer;
          transition-duration: 200ms
      }
  }
}


  ul {
    height: 100%;
    overflow: auto;
    padding: 2em;
    list-style-type: none;



    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #9a9a9a;
      transition-duration: 200ms;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #a5a5a5;
    }

    li {
      display: flex;
      margin-bottom: 10px;
    }
  }

  textarea {
    width: 100%;
    
    border-radius: 5px;
    outline: none;
    height: 70px;
    
    background: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.name_user};
    border: 2px solid ${({theme}) => theme.colors.separator};
    margin-bottom: 10px;
    

    
  }
`;

export const WaitingContainer = styled.div`
  color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  height: 100%;

  img {
    width: 300px;
    height: 380px;
    margin-bottom: 2em;
  }

  @keyframes pulsate-bck {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const Contador = styled.div`
  display: block;
  width: 160px;
  min-width: 160px;

  .main-cont {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    svg {
      cursor: pointer;
      width: 26px;
      height: 26px;

      :nth-child(1) {
        color: #c25252;
      }

      :nth-child(3) {
        color: #569241;
      }
    }

    .counter {
      p {
        font-size: 16px;
        text-align: center;
      }
    }
  }
`;

export const LoadMoreComponent = styled.button`
  color: #999;
  margin: 0 auto;
  border: 0;
  padding: 10px;
  background: rgba(236, 236, 236, 0.34);
  width: 100%;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 2em;
`;

export const ReplyContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  background: #ccc;
  align-items:center;
  justify-content:center;
  .content{
      flex: 1;
      align-items:center;
      justify-content:center;
  }
`;