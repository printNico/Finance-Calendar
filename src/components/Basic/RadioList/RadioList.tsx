import styled from "styled-components";
import {useEffect, useId, useState} from "react";

const StyledRadioListWrapper = styled.div`

`

const StyledInputLabel = styled.label`
  margin-left: .25rem;
  margin-bottom: .25rem;

  font-weight: bold;
`

const StyledRadioList = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-evenly;
`

const StyledRadio = styled.input`
`

const StyledRadioLabel = styled.label`
`

type OptionType = {
    label: string
    value: string
}

type RadioListProps = {
    label?: string
    value?: string
    options: OptionType[]
    onChange?: (value: string) => void
}

const RadioList = (props: RadioListProps) => {
    const rndId = useId();
    const [localValue, setLocalValue] = useState<string>("");

    const onValueChangeEvent = (event?: React.ChangeEvent<HTMLInputElement>, value?: string) => {
        const newValue = event?.target.value ?? value ?? "";

        if (props.onChange) props.onChange(newValue);
        setLocalValue(newValue);
    }

    useEffect(() => {
        if (props.value) setLocalValue(props.value);
    }, [props.value]);

    return (
        <StyledRadioListWrapper>
            {props.label && (
                <StyledInputLabel aria-label={props.label}>
                    {props.label}
                </StyledInputLabel>
            )}

            <StyledRadioList>
                {props.options.map((option, index) =>
                    <div
                        key={index}
                        onClick={() => onValueChangeEvent(undefined, option.value)}
                    >
                        <StyledRadio
                            name={rndId}
                            type="radio"
                            value={option.value}
                            checked={option.value === localValue}
                            onChange={onValueChangeEvent}
                        />
                        <StyledRadioLabel
                        >
                            {option.label}
                        </StyledRadioLabel>
                    </div>
                )}
            </StyledRadioList>
        </StyledRadioListWrapper>
    )
}

export const ConvertEnumToOptionTypes = (enumObject: any): OptionType[] => {
    let options: OptionType[] = [];

    for (let key in enumObject) {
        options.push({
            label: enumObject[key],
            value: key
        })
    }

    return options;
}

export default RadioList;