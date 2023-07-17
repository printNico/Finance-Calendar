"use client"

import {ReactElement} from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: none;

  color: white;

  border: none;
  border-radius: 50%;

  padding: 3px;

  &:hover {
    cursor: pointer;
    background: ${props => props.theme.colors.background3}
  }
`

type IconButtonProps = {
    className?: string
    Icon: ReactElement
    onClick?: () => void
}

const IconButton = (props: IconButtonProps) => {
    const onClickEvent = () => {
        if(props.onClick) props.onClick();
    }

    return (
        <>
            <StyledButton
                className={props.className}
                onClick={onClickEvent}
            >
                {props.Icon}
            </StyledButton>
        </>
    )
}

export default IconButton;