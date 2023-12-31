import styled from "styled-components";
import {ReactElement, ReactNode, useEffect, useState} from "react";

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  align-items: flex-start;

  width: 100%;
`

const StyledInputLabel = styled.label`
  margin-left: .25rem;
  margin-bottom: .25rem;

  font-weight: bold;
`

const StyledInputContainer = styled.div`
  background: ${props => props.theme.colors.background3};

  width: 100%;

  border-radius: 10px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  justify-content: center;
  align-items: center;
`

const StyledInput = styled.input`
  background: none;
  border: none;
  color: white;

  height: 100%;
  width: 100%;

  margin-inline: 1rem;
  margin-block: .75rem;

  font-size: 1rem;

  &:focus {
    outline: none;
  }
`

type TextFieldProps = {
    label?: string
    value?: string
    placeholder?: string
    onValueChange?: (value: string) => void
    onClick?: () => void

    prepends?: ReactElement
    appends?: ReactElement
}

const TextField = (props: TextFieldProps) => {
    const [localValue, setLocalValue] = useState("");

    const onClickEvent = () => {
        if (props.onClick) {
            props.onClick();
        }
    }

    const onValueChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (props.onValueChange) {
            if (newValue !== props.value) {
                props.onValueChange(newValue);
            }
        }
    }

    useEffect(() => {
        setLocalValue(props.value || "")
    }, [props.value]);

    return (
        <StyledInputWrapper onClick={onClickEvent}>
            <StyledInputLabel aria-label={props.label}>
                {props.label}
            </StyledInputLabel>

            <StyledInputContainer>
                {props.prepends}
                <StyledInput
                    value={localValue}
                    type="text"
                    placeholder={props.placeholder}
                    onChange={onValueChangeEvent}
                />
                {props.appends}
            </StyledInputContainer>
        </StyledInputWrapper>
    )
}

export default TextField