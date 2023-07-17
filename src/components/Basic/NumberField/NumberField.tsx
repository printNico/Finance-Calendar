import {ReactElement, useEffect, useState} from "react";
import styled from "styled-components";
import {set} from "zod";

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

type NumberFieldProps = {
    label?: string
    value?: string
    placeholder?: string
    min?: number
    max?: number
    steps?: number | string

    onValueChange?: (value: number) => void
    onClick?: () => void

    prepends?: ReactElement
    appends?: ReactElement
}

const NumberField = (props: NumberFieldProps) => {
    const [localValue, setLocalValue] = useState<string>("");

    const onClickEvent = () => {
        if (props.onClick) {
            props.onClick();
        }
    }

    const onValueChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value;
        const trimmedValue = rawValue.replaceAll("^0", "");

        if (!trimmedValue.match(/^[0-9]*(\.[0-9]{1,2})?$/)) {
            setLocalValue(localValue);
            return;
        }

        const parsedValue = parseFloat(trimmedValue);

        if (!isNaN(parsedValue)) {
            if (parsedValue !== props.value) {
                if (props.onValueChange) props.onValueChange(parsedValue)
            }
        }

        // @ts-ignore
        setLocalValue(rawValue);
    }

    useEffect(() => {
        if (props.value) setLocalValue(props.value);
    }, [props.value, props.min]);

    return (
        <StyledInputWrapper onClick={onClickEvent}>
            {props.label && (
                <StyledInputLabel aria-label={props.label}>
                    {props.label}
                </StyledInputLabel>
            )}

            <StyledInputContainer>
                {props.prepends}
                <StyledInput
                    value={localValue}
                    pattern="[0-9,\.]*"
                    min={props.min}
                    max={props.max}
                    step={props.steps}
                    placeholder={props.placeholder}
                    onChange={onValueChangeEvent}
                />
                {props.appends}
            </StyledInputContainer>
        </StyledInputWrapper>
    )
}
export default NumberField;
