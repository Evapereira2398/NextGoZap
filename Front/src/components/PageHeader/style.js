import styled from 'styled-components';
import { style } from '@mui/system';

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    background-color: #0B0B0B;
    padding: 0 30px;
    color: white;
    border-radius: 15px;
    margin-right: 5px;
`;

export const InfoBox = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 47%;
    gap: 32px;

    div {
        width: 140px;
        height: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        border-bottom: 2px solid white;

        .number {
            display:flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 20px;
            border-radius: 50px;
            background: #A37716;
            margin-bottom: 5px;
            font-size: 14px;
            
        }
    }
`;

export const UserBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 20%;

    .icon-box {
        margin-right: 8px;
    }

    #session {
        width: 120px;
        display: flex;
        text-align: start;
        margin-left: 5px;
        flex-direction: column;
        height: auto;
    }
`;
