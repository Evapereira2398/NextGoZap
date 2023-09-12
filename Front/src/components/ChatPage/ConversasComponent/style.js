import styled from "styled-components";
import {Archive} from "react-feather";

export const Layout = styled.aside`
  display: flex;
  flex-direction: column;
  background: ${({theme}) => theme.colors.background};

  height: 100%;
  width: 35rem;
  min-width: 20%;
  overflow: hidden auto;

  position: relative;
  transition-duration: 200ms;

  ::-webkit-scrollbar {
    width: 2px;
    height: 7px;
  }

  ::-webkit-scrollbar-track {
    background: ${({theme}) => theme.colors.separator};
  }

  ::-webkit-scrollbar-thumb {
    background: #929090;
    transition-duration: 200ms;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({theme}) => theme.colors.separator};
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 400;
    margin-left: 1em;
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding: .5em;

    li {
      transition-duration: 200ms;
      border-radius: 8px;

      :hover {
        background: ${({theme}) => theme.colors.hover_chat};
      }
    }

    .active {
      background: ${({theme}) => theme.colors.hover_chat};
    }
  }
`;

export const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  width: 420px;
  height: 52px;
  padding: 1em 2em;
  margin-bottom: 0.1em;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1em;
    margin-left -20px;
  }

  #icon {
    background: #EAB308;
    width: 35px;
    height: 27px;
    margin-left: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;

    img{
      margin-top: -1px;
      margin-left: 17px;
      width: 25px;
      height: 25px;
    }
  }
`;

export const WarningDiv = styled.div`
  display: flex;
  width: calc(100% - 1em);
  margin: 8px;
  height: 30px;
  padding: 5px 5px;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  background: #F4DFB0;

  p {
    color: #62470D;
    font-size: 13px;
    font-style: normal;
    line-height: normal;
    margin: auto;
  }

  span.bold {
    font-weight: 700;
  }
`;

export const SearchComponent = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  flex-direction: row;
  transition-duration: 200ms;
  position: sticky;
  top: 0;
  padding: 1em 1em;
  margin-top: -0.25em;
  background: ${({theme}) => theme.colors.background};
  border-bottom: 1px solid ${({theme}) => theme.colors.separator};
  z-index: 1;

  input {
    border: 1px solid #969696;
    border-radius: 4px;
    background: transparent;
    width: 100%;
    padding: 5px 5px 5px 35px;
    outline: 0;
    position: relative;
  }

  input::placeholder {
    color: #969696;
    opacity: 1; /* necessário para o Firefox */
  }

  svg {
    width: 15px;
    height: 15px;
    position: absolute;
    left: 25px;
  }
`;

export const ArchiveDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 2em; // Para manter a formatação consistente com o componente SearchComponent.
  cursor: pointer;
  transition: background 0.3s ease;

  :hover {
    background: #e1e1e1;
  }
`;

export const ArchiveIcon = styled(Archive)`
  width: 18px;
  height: 18px;
  color: #E1A421;
  margin-right: 1em;
`;


export const ContactInfo = styled.label`
  input[type=radio] {
    display: none;
  }

  input[type=radio]:checked + .contact-info {
    background: #F4F6F9;
  }
`;

export const UserData = styled.div`
  display: flex;
  padding: 20px 10px;
  transition-duration: 200ms;
  borderBottom: '8px solid rgba(000, 000, 000, 0.9)';

  img {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
    margin-top: 2px;
  }

  .principal-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50px;
    gap: 7px;
    margin-left: 3px;
  }

  .contact-name {
    font-weight: 600;
    font-size: 15px;
    color: ${({theme}) => theme.colors.name_user};
  }

  .contact-message {
    display: flex;
    width: 100%;
    
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    font-size: 15px;

    color: ${({theme}) => theme.colors.message_content};
    font-weight: 400;

    .unread-message {
      position: absolute;
      margin-left: 65%;

      width: 18px;
      height: 18px;
      background: #EAB308;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;

      p {
        font-weight: 600;
      }
    }
  }
`;