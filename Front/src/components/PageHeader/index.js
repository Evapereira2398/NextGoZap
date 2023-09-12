import React from 'react';
import { HeaderContainer, InfoBox, UserBox } from './style';
import DrawerIcon from '../../assets/DrawerIcon.png';
import IconSino from '../../assets/IconSino.png';

const Header = () => {
    return (
        <HeaderContainer>
            <InfoBox>
                <div>
                    <span className="title">Todas</span>
                    <span className="number">120</span>
                </div>

                <div>
                    <span className="title">Andamento</span>
                    <span className="number">10</span>
                </div>

                <div>
                    <span className="title">Pendentes</span>
                    <span className="number">8</span>
                </div>

                <div> 
                    <span className="title">Concluídas</span>
                    <span className="number">42</span>
                </div>

            </InfoBox>

            <UserBox>
                <div className="icon-box">
                    <img src={IconSino} alt="IconSino" style={{ width: '25px', height: '25px'}}/>
                </div>
                <div className="icon-box">
                    <img src={DrawerIcon} alt="Icon" style={{ width: '25px', height: '25px'}}/>
                </div>
                
                <div id='session'>
                    <span className="name">Evanderson</span>
                    <span className="phone">+5541992347486</span>
                </div>
            </UserBox>
        </HeaderContainer>
    );
};

export default Header;
