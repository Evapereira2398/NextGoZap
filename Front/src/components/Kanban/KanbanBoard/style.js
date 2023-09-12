import styled from "styled-components";

export const ScrollContainer = styled.div`
   max-width: calc(100% - 120px);
   height: 650px;
   overflow-x: auto;
   display: flex;
   margin-left: 15px;
   padding: 0px 5px;

   &::-webkit-scrollbar {
      width: 15px;
      height: 15px;
   }

   &::-webkit-scrollbar-thumb {
      height: 10px;
      border-radius: 15px;
      background-color: rgba(176, 176, 176, 0.6);
   }

   &::-webkit-scrollbar-thumb:hover {
      background-color: #e1a421;
      border: 2px solid transparent;
      background-clip: content-box;
      border-radius: 4px;
      cursor: pointer;
      border-radius: 15px;
   }

   &::-webkit-scrollbar-track {
      background-color: #fff;
   }
`;

export const KanbanContainer = styled.div`
   display: flex;
   white-space: nowrap;
   gap: 16px;
`;

export const Column = styled.div`
   background-color: #fff;
   min-width: 265px;
   overflow-y: auto;
   height: 630px;

   &::-webkit-scrollbar {
      width: 8px;
   }

   &::-webkit-scrollbar-thumb {
      background-color: rgb(000, 000, 000, 0.2);
      border-radius: 4px;
   }

   &::-webkit-scrollbar-thumb:hover {
      background-color: rgb(000, 000, 000, 0.3);
   }

   &::-webkit-scrollbar-track {
      background-color: transparent;
   }
`;

export const FloatingButton = styled.button`
   position: fixed;
   bottom: 20px;
   right: 20px;
   width: 60px;
   height: 60px;
   border-radius: 50%;
   background-color: #e1a421;
   border: none;
   color: #fff;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 36px;
   cursor: pointer;
   box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);

   &:hover::after {
      content: "Pressione Ctrl + Alt + N para criar rapidamente uma nova coluna";
      position: absolute;
      right: 70px;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 8px 12px;
      border-radius: 5px;
      font-size: 0.9rem;
      white-space: nowrap;
      pointer-events: none;
   }

   &:hover {
       background-color: #d4921e;
   }

   &:focus {
      outline: none;
   }
`;