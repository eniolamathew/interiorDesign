import React from "react";
import styled from "styled-components";
import { SingupButton } from "./button/singupButton";
import Icon, { IconType } from "../icons/icon";

interface ButtonContainerProps {
  text?: string;
  icon?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonText = styled.div`
  display: contents;
  text-align: center;
  font-size: 1.2rem;
`;

const ButtonContainerWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer: React.FC<ButtonContainerProps> = ({text, icon, onClick}) => {
  return (
    <ButtonContainerWrapper>
      <SingupButton onClick={onClick}>
        {text && <ButtonText>{text}</ButtonText>}
        {icon && <Icon
          className="chevronLeft"
          src={IconType.ChevronLeft}
          alt="Chevron-left"
          width={"16px"}
          height={"16px"}
          filter={"invert(100%) brightness(100%) contrast(100%)"}
        />}
      </SingupButton>
    </ButtonContainerWrapper>
  );
};

export default ButtonContainer;
