import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const MainContainer = styled.main`
    margin-top: 10px;
    display: flex;
    height: calc(100vh - 60px - 20px);
    overflow: hidden; 
    gap: 20px;
    background: #F5F5F5;
`;

export const LeftColumn = styled.div`
    width: 450px;
    height: 98%;
    overflow-y: auto;
    border-radius: 8px;
    background: #FFF;
    padding: 15px;
    box-sizing: border-box;


    &::-webkit-scrollbar {
        width: 8px; 
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgb(000, 000, 000, 0.2);
        border-radius: 10px;
    }
`;

export const ColumnTitle = styled.h2`
    color: #030712;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    margin-bottom: 15px; 
    margin-left: 7px;
`;

export const OptionDiv = styled.div`
    display: flex;
    align-items: center;
    width: 400px;
    padding: 8px;
    justify-content: space-between;
    border-radius: 8px;
    background:  #F5F5F5;
    margin-bottom: 10px; 

    &:hover {
        background-color: #FEF3C7;
    }

    &.selected {
        background-color: #FEF3C7;
    }
`;

export const OptionIcon = styled.img`
    // Se você precisar de estilos específicos para o ícone
`;



export const MiddleColumn = styled.div`
    width: 450px;
    height: 98%;
    border-radius: 8px;
    background: #FFF;
    padding: 15px;
    box-sizing: border-box;
    margin-left: 20px;
    box-sizing: border-box;
`;


export const SelecionarTudo = styled.div`
    display: flex;
    height: 35px;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
`;

export const AddAllContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #F5F5F5;
    border-radius: 8px;
    padding: 10px;
    height: 30px;
    width: 50%;
`;

export const CheckBoxIcon = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid #737373;
    background-color: #FFF;
    
    &.selected {
        border-color: var(--green-600, #22C55E);
        background-color: var(--green-600, #22C55E);
    }
`;


export const AddAllText = styled.span`
    color: #030712;
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
`;

export const SearchBar = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 16px;
    border-radius: 8px;
    border: 1px solid #737373;
    padding: 16px;
    height: 30px;
`;

export const SearchIcon = styled.img`
    width: 17px;
    height: 17px;
`;

export const SearchInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background-color: transparent;
`;

export const RightColumn = styled.div`
    width: 450px;
    height: 98%;
    border-radius: 8px;
    background: #FFF;
    padding: 15px;
    box-sizing: border-box;
    margin-left: 20px;
    padding-left: 20px;
    box-sizing: border-box;
`;

export const ColumnHeading = styled.h2`
    color: #030712;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    margin-bottom: 15px; 
`;

export const OptionTitle = styled.h3`
    color: #030712;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
`;

export const OptionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 348px;
    height: 40px;
    border-radius: 8px;
    border: 1 px solid #737373;
    margin-bottom: 20px;
    background: transparent;

    span { 
        color: #030712;
        font-size: 15px;
        font-weight: 400;
        padding: 15px;
    }
`;

export const RightIcon = styled.img`
    width: 17px;
    height: 17px;
    margin-right: 15px;
`;

export const InfoText = styled.div`
    width: 348px;
    padding: 10px;
    flex-shrink: 0;
    color: #451A03;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 15px;
    border-radius: 4px;
    background: #FEF3C7;
`;

export const ShootButton = styled.button`
    width: 350px;
    height: 50px;
    border-radius: 8px;
    background: #EAB308;
    color: #F5F5F5;
    font-size: 16px;
    font-weight: 700;
    border: none;
    cursor: pointer;
`;


// Importar CSV

export const InfoDiv = styled.div`
    display: flex;
    width: 90%;
    padding: 15px 15px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background:  #FEF3C7;
    margin-left: 20px;
    margin-top: 30px;
`;

export const InfoTextCSV = styled.p`
    color: #451A03;
    font-size: 16px;
`;

export const ImportButton = styled.button`
    width: 90%; 
    height: 40px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 2px solid  #EAB308;
    background: transparent;
    color:  #EAB308;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    cursor: pointer;
    margin-left: 20px;
    margin-top: 30px;

    &:hover {
        background-color: #EAB308;
        color: white;
    }
`;


// Container dos contatos 

export const ContactsContainer = styled.div`
    height: 85%;
    margin-top: 30px;
    padding: 10px;
    overflow-y: auto;
    border: 1px solid red;

    &::-webkit-scrollbar {
        width: 8px; 
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgb(000, 000, 000, 0.2);
        border-radius: 10px;
    }
`;

export const ContactDiv = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
    gap: 15px;
`;

export const ContactCheckbox = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid #737373;
    margin-right: 10px;
    cursor: pointer;
`;

export const ContactImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid red;
`;

export const ContactName = styled.span`
    color: #030712;
    font-size: 16px;
    font-weight: 400;
`;