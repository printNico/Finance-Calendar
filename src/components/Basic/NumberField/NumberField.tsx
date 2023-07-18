import styled from "styled-components";
import CurrencyInput from "react-currency-input-field";
import {MdEuro} from "react-icons/md";
import {ReactElement, useEffect, useState} from "react";
import {CurrencyInputOnChangeValues} from "react-currency-input-field/src/components/CurrencyInputProps";

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
    value?: number
    placeholder?: string

    min?: number
    max?: number
    step?: number | string

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
        const inputValue = event.target.value
        const filteredValue = inputValue.replace(/[^0-9]/g, "")
        const parsedValue = parseInt(filteredValue)

        if (!isNaN(parsedValue)) {
            let newValue = parsedValue;
            if(props.min && parsedValue < props.min) {
                newValue = props.min;
            }

            if(props.max && parsedValue > props.max) {
                newValue = props.max;
            }

            if (props.onValueChange)
                props.onValueChange(newValue)
            setLocalValue(newValue.toString());
        } else {
            setLocalValue("")
        }
    }

    useEffect(() => {
        if (props.value) {
            setLocalValue(props.value.toString() ?? "");
        }
    }, [props.value]);

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
                    placeholder={props.placeholder}
                    onChange={onValueChangeEvent}
                />
                {props.appends}
            </StyledInputContainer>
        </StyledInputWrapper>
    )
}

export default NumberField;