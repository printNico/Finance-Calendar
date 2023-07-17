import styled from "styled-components";

const StyledButton = styled.button`

`

type ButtonProps = {
    label: string
    className?: string
    onClick?: () => void
}

const Button = (props: ButtonProps) => {
    const onClickEvent = () => {
        if (props.onClick) props.onClick();
    }

    return (
        <>
            <StyledButton
                className={props.className}
                aria-label={props.label}
                onClick={onClickEvent}
            >
                {props.label}
            </StyledButton>
        </>
    )
}

export default Button;