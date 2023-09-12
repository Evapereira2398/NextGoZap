import styled, { css } from "styled-components";
import DownloadImage from "../../../assets/ic_download_chat.svg";

export const ChatLayout = styled.div`
  width: 100%;
  ${({ side }) =>
    side !== "left" &&
    css`
      display: flex;
      flex-direction: row-reverse;
    `};
`;

export const MessageContainer = styled.div`
  width: fit-content; 
  font-size: 14px;
  font-weight: 400;
  height: auto;
  position: relative;
  display: flex;
  padding: 7px 15px;
  flex-direction: column;
  flex-wrap: wrap;
  width: fit-content;
  max-width: 380px;
  height: auto;
  border-radius: ${({ side }) => (side === "left" ? "16px 4px 4px 4px" : "16px 16px 0px 16px")};
  background: ${({ side }) => (side === "left" ? "#FFF" : "#FEF3C7")};

  ${({ isWarning }) =>
    !isWarning &&
    css` 
      background: ${({ side }) => (side === "left" ? "#FFF" : "#FEF3C7")};
    `}

  .caption {
    bottom: 0;
    padding: 10px;
  }

  ${({ isWarning }) =>
    isWarning &&
    css`
      width: 100%;
      color: ${({ theme }) => theme.colors.name_user};
      text-align: center;

    `}
`;


export const MessageContent = styled.div`
  display: flex;
  position: relative;
  color: #030712;
  font-size: 14px;
  font-weight: 400;

  ${({ isWarning }) =>
    isWarning
      ? css`
          max-width: 100%;
          text-align: center; 
        `
      : css`
          max-width: 400px;
        `}
    
      span {
        display: block;
        width: 100%;
      }

  .download {
    position: absolute;
    background-image: url("${DownloadImage}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    padding: 2em;
    margin: auto;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 80px;
    height: 80px;
  }
`;

export const ImageContainer = styled.div`
  min-width: 400px;
  max-height: 300px;
  background: #888;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    cursor: pointer;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;

export const DocumentComponent = styled.div`
  width: 100%;
  ${({ isWarning }) =>
    isWarning &&
    css`
      max-width: 500px;
    `}
  background: #f0f0f0;
  color: #333;
  padding: 1em 10px;
  min-width: 250px;
  border-radius: 5px;
  cursor: pointer;

  svg {
    color: #909090;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.separator};
    padding: 5px;
    width: 30px;
    height: 30px;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StickerComponent = styled.img`
  width: 125px;
  height: 125px;
  object-fit: contain;
`;

export const MessageContentText = styled.div`
  width: 100%;
  position: relative;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  a {
    color: ${({ side }) => (side === "left" ? "#333" : "#fff")};
  }
`;
