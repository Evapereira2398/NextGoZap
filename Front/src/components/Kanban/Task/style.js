import styled from "styled-components";
import IconEtiquetaTask from "../../../assets/IconEtiquetaKanban.svg";
import IconMoreOptionsTask from "../../../assets/IconMoreOptionsTask.svg";

export const TaskContainer = styled.div`
   width: 250px;
   height: 100px;
   background: #fff;
   padding: 10px;
   display: flex;
   align-items: center;
   position: relative;
   margin-left: 5px;
   transition: box-shadow 0.3s ease;
   box-shadow: ${(props) =>
      props.isDragging ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none"}; 
   `;

export const TaskImage = styled.img`
   width: 48px;
   height: 48px;
   flex-shrink: 0;
   border-radius: 50%;
   margin-right: 10px;
`;

export const TaskTitle = styled.span`
   color: #030712;
   font-size: 16px;
   font-weight: 400;
`;

export const TaskSubtitle = styled.span`
  color: #404040;
  font-size: 14px;
  font-weight: 400;
  display: block;
`;

export const TaskFooter = styled.div`
  position: absolute;
  bottom: ${(props) => (props.hasColorBar ? '25px' : '10px')};
  right: 10px;
  display: flex;
  align-items: center;
`;

export const ColorBar = styled.div`
  position: absolute;
  bottom: 5px;    
  left: 0;
  right: 0;
  height: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
`;

export const TagIcon = styled.img.attrs({
  src: IconEtiquetaTask,
  alt: "Tag",
})`
  margin-right: 5px;
`;

export const OptionsIcon = styled.img.attrs({
  src: IconMoreOptionsTask,
  alt: "Options",
})``;