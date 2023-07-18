import {ReactElement, useEffect, useState} from "react";
import styled from "styled-components";
import {MdEuro} from "react-icons/md";
import CurrencyInput from "react-currency-input-field";
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

const StyledCurrencyInput = styled(CurrencyInput)`
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

const StyledEuroIcon = styled(MdEuro)`
  margin-inline: 1rem;
`

type NumberFieldProps = {
    label?: string
    value?: number
    placeholder?: string

    onValueChange?: (value: number) => void
    onClick?: () => void

    prepends?: ReactElement
    appends?: ReactElement
}

const CurrencyField = (props: NumberFieldProps) => {
    const [localValue, setLocalValue] = useState<string>();

    const onClickEvent = () => {
        if (props.onClick) {
            props.onClick();
        }
    }

    const onValueChangeEvent = (value?: string, name?: string, event?: CurrencyInputOnChangeValues) => {
        const inputValue = event?.value ?? "0";
        const inputFloat = event?.float ?? 0;

        if (props.onValueChange)
            props.onValueChange(inputFloat)
        setLocalValue(inputValue);
    }

    useEffect(() => {
        if (props.value) {
            setLocalValue(props.value.toString());
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
                <StyledCurrencyInput
                    value={localValue}
                    placeholder={props.placeholder}
                    onValueChange={onValueChangeEvent}

                    allowDecimals={true}
                    decimalsLimit={2}
                />
                <StyledEuroIcon size="24px"/>
                {props.appends}
            </StyledInputContainer>
        </StyledInputWrapper>
    )
}
export default CurrencyField;
