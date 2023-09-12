import styled from 'styled-components';

export const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 10;
`;

export const StyledButton = styled.button`
  border: 1px solid transparent;
  border-bottom-color: ${props => props.isMenuOpen ? 'transparent' : '#969696'} !important;
  border-radius: ${props => props.isMenuOpen ? '8px 8px 0 0' : '8px'};
`;


export const StyledMenu = styled.div`
  border: 1px solid #969696;
  border-top: none;
  border-radius: 0 0 8px 8px;
  width: 100px;
  height: 150px;
  overflow-y: auto;
  position: absolute;
  top: 25px;
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  padding-top: 10px;

  /* Estilização do scrollbar */
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f2f2f2;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
    border: 1px solid #f2f2f2;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

export const StyledMenuItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    background-color: #f2f2f2;
  }
`;
