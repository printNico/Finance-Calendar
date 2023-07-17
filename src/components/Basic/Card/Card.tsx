import {ReactNode} from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  background: ${props => props.theme.colors.background2};

  padding: 1rem;
`

type CardProps = {
    className?: string;
    children?: ReactNode;
    onClick?: () => void;
}

const Card = (props: CardProps) => {
    const onClickEvent = () => {
        if(props.onClick) props.onClick();
    }

    return (
        <>
            <StyledDiv className={props.className} onClick={onClickEvent}>
                {props.children}
            </StyledDiv>
        </>
    )
}

export default Card;