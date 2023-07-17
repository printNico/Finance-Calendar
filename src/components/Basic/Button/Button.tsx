import styled from "styled-components";
import {readableColor} from "polished";

const StyledButton = styled.button<{ $primary: boolean, $secondary: boolean, $outlined: boolean }>`
  border: none;
  border-radius: 10px;

  ${
          props => {
            let color = props.theme.colors.noColor;

            if (props.$primary) color = props.theme.colors.primary;
            else if (props.$secondary) color = props.theme.colors.secondary;
            else color = props.theme.colors.noColor;

            if (props.$outlined) {
              return `
                  background: none;
                  color: ${color};
                  border: 1px solid ${color};
                `
            } else {
              return `
                    background: ${color};
                    color: ${readableColor(color)};
                `
            }
          }
  }

  font-size: 1.25rem;
  font-weight: 600;

  padding: .5rem;
  padding-inline: 1rem;

  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`

type ButtonProps = {
    label: string
    className?: string
    onClick?: () => void
    disabled?: boolean
    $primary?: boolean
    $secondary?: boolean
    $outlined?: boolean
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
                disabled={props.disabled ?? false}
                $primary={props.$primary ?? false}
                $secondary={props.$secondary ?? false}
                $outlined={props.$outlined ?? false}
            >
                {props.label}
            </StyledButton>
        </>
    )
}

export default Button;