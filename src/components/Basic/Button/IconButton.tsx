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
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const IconButton = (props: IconButtonProps) => {
    const onClickEvent = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (props.onClick) props.onClick(event);
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