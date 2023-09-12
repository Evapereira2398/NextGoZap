import styled from 'styled-components'

export const HeaderComponent = styled.header`
  position: relative;
  background-color: black;
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 15px; 
  box-sizing: border-box;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  gap: 15px;
  flex-direction: row;
  justify-content: flex-start;
`;

export const RightSession = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  display: ${({ display }) => (display ? 'flex' : 'none')};
  align-items: center;
  width: 220px;
  justify-content: flex-end;  
  z-index: 10;
  min-width: 220px;

  .icon-box {
    margin-right: 8px;
    img {
      width: 25px;
      height: 25px;
    }
  }

  #NewColumn {
    cursor: pointer;
  }

  #session {
    width: 120px;
    display: flex;
    text-align: start;
    margin-left: 5px;
    flex-direction: column;
    gap: 5px;
  }

  .name, .phone { 
    color: #fff;
  }
`;


export const TitleContainerParent = styled.div`
  display: flex;
  overflow-y: hidden;
  gap: 16px;
  margin-top: 20px; 
  max-width: calc(100% - 100px);
  padding: 0px 5px;

  &::-webkit-scrollbar {
    height: 0px;  
    background-color: rgba(255, 255, 255, 0.2);  
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;  
  }
  
  scrollbar-color: transparent transparent;    

  &::-webkit-scrollbar-button {
    width: 0px;
    height: 0px; 
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent; 
  }

  scrollbar-width: thick;  
  scrollbar-color: rgba(255, 255, 255, 0.5) rgba(255, 255, 255, 0.2);

`;

export const ColumnTitleContainer = styled.div`
  display: flex;
  min-width: 265px;
  height: 50px;
  padding: 0px 8px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0px 0px;
  background: #eab308;
  position: relative;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTitle = styled.span`
  color: #F5F5F5;
  font-size: 15px;
  font-weight: 500;
  max-width: 150px;  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`;

export const TaskCount = styled.span`
  color:#F5F5F5;
  padding: 5px 10px;
  margin-left: 5px;
  font-size: 14px;
  font-weight: bold; 
`;


export const TitlesContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  max-width: calc(100% - 280px - 30px); 
  height: 60px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    height: 10px;  
    background-color: rgba(255, 255, 255, 0.2);  
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);  
    border-radius: 5px;  
  }

  &::-webkit-scrollbar-button {
    width: 0px;
    height: 0px; 
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent; 
  }

  scrollbar-width: thick;  
  scrollbar-color: rgba(255, 255, 255, 0.5) rgba(255, 255, 255, 0.2);
`;

export const OtherPagesTitleContainer = styled.div`
    width: auto;
    height: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    gap: 10px;
    height: 25px;
    margin-top: 10px;
    cursor: pointer; 

    &:not(:first-child) {
      margin-left: 15px;
    }
`;

export const Title = styled.span`
    color:  #F5F5F5;
    font-size: 15px;
    font-weight: 500;
`;

export const NumberBox = styled.div`
    display: flex;
    padding: 2px 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 100px;
    background: #EAB308;
    width: 28px;
`;

export const NumberText = styled.span`
    color: #F5F5F5;
    font-size: 14px;
    font-weight: 500;
`;

export const WhiteLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: white;
    position: absolute;
    bottom: -1px;
    left: 0;
`;  


// Menu Header
export const SubMenu = styled.div`
   width: 200px;
   height: 150px;
   flex-shrink: 0;
   position: absolute;
   border-radius: 0px 0px 10px 10px;
   background: #030712;
   z-index: 15;
   top: 50px;
   left: 30px;
`;

export const SubMenuItem = styled.div`
   padding: 12px 16px;
   cursor: pointer;
   color:  #F5F5F5;
   font-size: 14px;
   font-weight: 400;

   &:hover {
      background-color: rgba(176, 176, 176, 0.6);
   }
`;

export const DropdownMenu = styled.div`
   display: ${props => (props.show ? 'block' : 'none')};
   position: fixed;  // Mude de 'absolute' para 'fixed'
   background-color: #f9f9f9;
   min-width: 180px;
   margin-left: -120px;
   border-radius: 10px;
   box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
   z-index: 1000;
`;
      
export const DropdownItem = styled.div`
   padding: 12px 16px;
   text-decoration: none;
   display: block;
   cursor: pointer;

   &:hover {
      background-color: #f1f1f1;
      border-radius: 10px;
   }
`;

export const StyledInput = styled.input`
   background: transparent;
   border: none;
   border-bottom: 1px solid white; 
   outline: none;
   padding: 5px;
   color: white; 
   transition: all 0.3s;

   &:focus {
      border-bottom: 2px solid white;
   }
`;