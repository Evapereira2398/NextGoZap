import styled from "styled-components";
import { ReactComponent as IconSideBar1 } from '../../assets/SideBarIcon1.svg';
import { ReactComponent as IconSideBar2 } from '../../assets/SideBarIcon2.svg';
import { ReactComponent as IconSideBar3 } from '../../assets/SideBarIcon3.svg';
import { ReactComponent as IconSideBar4 } from '../../assets/SideBarIcon4.svg';


export const Layout = styled.div`
  height: 750px;
  width: 88px;
  background: #0B0B0B;
  margin-top: -2px;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img#logo {
    margin-left: 20px;
    margin-top: 17px;
  }
`;


// Icons 
export const StyledIcon1 = styled(IconSideBar1)`
    width: 24px; 
    height: 24px;

    color: currentColor; 

    a:hover &,
    a.selected & {
        filter: invert(1) brightness(12);
    }

`;

export const StyledIcon2 = styled(IconSideBar2)` 
    width: 24px; 
    height: 24px;

    color: currentColor; 

    a:hover &,
    a.selected & {
        filter: invert(1) brightness(12);
    }
`;

export const StyledIcon3 = styled(IconSideBar3)` 
    width: 24px; 
    height: 24px;

    color: currentColor; 

    a:hover &,
    a.selected & {
        filter: invert(1) brightness(12);
    }
`;

export const StyledIcon4 = styled(IconSideBar4)` 
    width: 24px; 
    height: 24px;

    color: currentColor; 

    a:hover &,
    a.selected & {
        filter: invert(1) brightness(12);
    }
`;

export const BottomItems = styled.footer`
  display: flex;
  flex-direction: column;
  color: white;
`;

export const MenuItems = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1em;
  list-style-type: none;
  margin-top: -180px;
  margin-left: 8px;
 
  li {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
    width: 100%;
    transition-duration: 200ms;
    border-radius: .5rem;
   

    :hover {
      background:   ;

      img {
        /* Mudando a cor da imagem para branco quando o mouse passa por cima */
        filter: invert(1) brightness(1);
      }
    }
  }

  .disabled {
    cursor: not-allowed;
    color: #999;

    :hover {
      background: #fff;

      * {
        color: #999;
      }
    }
  }

  a {
    display: flex;   // Adicione isso para permitir a centralização do conteúdo
    justify-content: center; // Centraliza horizontalmente
    align-items: center;     // Centraliza verticalmente
    padding: 7px;
    display: flex;
    align-items: center;
    border-radius: .4rem;
    color: #6e6f73;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    width: 100%;

    &:hover {
      background: #e6b544; 
    }

    &.selected {
      background: #e6b544; 
    }
    }
  }
`;


export const ChangeSession = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 1em;
  border-top: 1px solid rgba(0, 0, 0, .1);
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  font-size: 1rem;

  .online-circle {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: aquamarine;
    margin-right: .5em;
  }

  div {
    display: flex;
    align-items: center;
  }

  a {
    color: #47a7f6;
    text-decoration: none;
  }
`;

export const InfoSession = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 10px;
  font-size: 1rem;
  cursor: default;

  div {
    display: flex;
    flex-direction: column;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  a {
    font-size: 1rem;
    margin-top: 10px;
    color: #f64747;
  }
`;

export const LogoutButton = styled.p`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  padding: 10px;
  margin-bottom: 24px;
  transition-duration: 200ms;
`;