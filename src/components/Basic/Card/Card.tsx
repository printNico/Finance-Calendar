import {ReactNode} from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  background: ${props => props.theme.colors.background2};

  padding: 1rem;
`

type CardProps = {
    className?: string;
    children?: ReactNode;
}

const Card = (props: CardProps) => {
    return (
        <>
            <StyledDiv className={props.className}>
                {props.children}
            </StyledDiv>
        </>
    )
}

export default Card;