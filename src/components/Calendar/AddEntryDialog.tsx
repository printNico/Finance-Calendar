"use client"

import NumberField from "@/components/Basic/NumberField/NumberField";
import {Dialog} from "@headlessui/react";
import styled from "styled-components";
import {rgba} from "polished";
import Card from "@/components/Basic/Card/Card";
import Button from "@/components/Basic/Button/Button";
import TextField from "@/components/Basic/TextField/TextField";
import {useState} from "react";
import ColorPicker from "@/components/Basic/ColorPicker/ColorPicker";
import {Entry} from "@/lib/types/Entry";
import {useDispatch} from "react-redux";
import {addEntry} from "@/store/entriesSlice";

const StyledDialog = styled(Dialog)`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${props => rgba(props.theme.colors.background1, 0.25)};
`

const StyledCard = styled(Card)`
  width: 50%;
  height: 50%;

  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;

  display: grid;
  flex-direction: column;
  flex-wrap: nowrap;

`
const StyledH1 = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;

  margin-bottom: 1rem;
`

const StyledHr = styled.hr`
  margin-inline: -1rem;
  margin-bottom: 1rem;
`

const StyledContentContainer = styled.div`
  > div:not(:last-child) {
    margin-bottom: 1rem;
  }
`

const StyledActionContainer = styled.div`
  justify-self: flex-end;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  button:not(:last-child) {
    margin-right: 1rem;
  }
`

type DialogProps = {
    show: boolean;
    onClose?: () => void;
    onAdd?: (entry: Entry) => void;
}

const AddEntryDialog = ({show = false, ...props}: DialogProps) => {
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#ffff00");
    const [amount, setAmount] = useState<number>();
    const [additive, setAdditive] = useState(true);

    const onCloseEvent = () => {
        if (props.onClose) props.onClose();
    }

    const onAddEntryEvent = () => {
        if (!title || title === "") return;
        if (!color || color === "") return;

        const newEntry: Entry = {
            title: title,
            color: color
        } as Entry;

        if (props.onAdd) props.onAdd(newEntry);
    }

    return (
        <StyledDialog open={show} onClose={onCloseEvent}>
            <StyledCard>
                <StyledContentContainer>
                    <StyledH1>
                        Add new Entry
                    </StyledH1>

                    <StyledHr/>

                    <TextField
                        label="Title"
                        placeholder="Versicherung"
                        value={title}
                        onValueChange={setTitle}
                    />

                    <ColorPicker
                        color={color}
                        onColorChange={setColor}
                    />

                    <NumberField
                        label="Amount"
                        placeholder="25"
                        min={1}
                        steps="any"
                        value={amount}
                        onValueChange={(n) => {
                            setAmount(n);
                            console.log(n)
                        }}
                    />
                </StyledContentContainer>
                <StyledActionContainer>
                    <Button label="Cancel" onClick={onCloseEvent} $outlined/>
                    <Button label="Add" onClick={onAddEntryEvent} $primary/>
                </StyledActionContainer>
            </StyledCard>
        </StyledDialog>
    )
}

export default AddEntryDialog;