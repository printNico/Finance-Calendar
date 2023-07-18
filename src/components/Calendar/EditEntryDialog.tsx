"use client"

import CurrencyField from "@/components/Basic/NumberField/CurrencyField";
import {Dialog} from "@headlessui/react";
import styled from "styled-components";
import {rgba} from "polished";
import Card from "@/components/Basic/Card/Card";
import Button from "@/components/Basic/Button/Button";
import TextField from "@/components/Basic/TextField/TextField";
import {useEffect, useState} from "react";
import ColorPicker from "@/components/Basic/ColorPicker/ColorPicker";
import {ConvertKeyToValueEnum, ConvertValueToKeyEnum, Entry, EntryAction, EntryType} from "@/lib/types/Entry";
import NumberField from "@/components/Basic/NumberField/NumberField";
import RadioList, {ConvertEnumToOptionTypes} from "@/components/Basic/RadioList/RadioList";
import {IoMdAdd, IoMdRemove} from "react-icons/io";

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
  height: 55%;

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

const StyledPrependAdd = styled(IoMdAdd)`
  margin-left: 1rem;
`

const StyledPrependRemove = styled(IoMdRemove)`
  margin-left: 1rem;
`

const StyledAppendDays = styled.span`
  margin-inline: 1rem;
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

type EditEntryDialogProps = {
    show: boolean;
    entry: Entry;
    onClose?: () => void;
    onEdit?: (entry: Entry) => void;
    onRemove?: (entry: Entry) => void;
}

const EditEntryDialog = ({show = false, ...props}: EditEntryDialogProps) => {
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#ffff00");
    const [amount, setAmount] = useState<number>();
    const [entryType, setEntryType] = useState<EntryType>(EntryType.onetime);
    const [entryAction, setEntryAction] = useState<EntryAction>(EntryAction.additive);
    const [frequency, setFrequency] = useState<number>(7);

    useEffect(() => {
        if (!props.entry) return;

        setTitle(props.entry.title);
        setColor(props.entry.color);
        setAmount(props.entry.amount);
        setEntryType(props.entry.type);
        setEntryAction(props.entry.action);
        setFrequency(props.entry.frequency);
    }, [props.entry]);

    const onCloseEvent = () => {
        if (props.onClose) props.onClose();
    }

    const onEditEntryEvent = () => {
        if (!title || title === "") return;
        if (!color || color === "") return;
        if (!amount || amount <= 0) return;
        if (!frequency || frequency <= 0 || frequency > 356) return;

        const newEntry: Entry = {
            id: props.entry.id,
            date: props.entry.date,

            title: title,
            color: color,
            amount: amount,
            frequency: frequency,
            action: entryAction,
            type: entryType,
        } as Entry;

        if (props.onEdit) props.onEdit(newEntry);
    }

    const onRemoveEntryEvent = () => {
        if (props.onRemove) props.onRemove(props.entry);
    }

    return (
        <StyledDialog open={show} onClose={onCloseEvent}>
            <StyledCard>
                <StyledContentContainer>
                    <StyledH1>
                        Editing Entry
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

                    <CurrencyField
                        label="Amount"
                        placeholder="25"
                        value={amount}
                        onValueChange={setAmount}
                        prepends={entryAction === EntryAction.additive ?
                            <StyledPrependAdd size="24px"/> :
                            <StyledPrependRemove size="24px"/>
                        }
                    />

                    <RadioList
                        label="Entry Action"
                        value={ConvertKeyToValueEnum(entryAction, EntryAction)}
                        options={ConvertEnumToOptionTypes(EntryAction)}
                        onChange={(value) => {
                            const option = ConvertValueToKeyEnum(value, EntryAction);
                            if (option) setEntryAction(option)
                        }}
                    />

                    <RadioList
                        label="Entry Type"
                        value={ConvertKeyToValueEnum(entryType, EntryType)}
                        options={ConvertEnumToOptionTypes(EntryType)}
                        onChange={(value) => {
                            const option = ConvertValueToKeyEnum(value, EntryType);
                            if (option) setEntryType(option)
                        }}
                    />

                    {entryType === EntryType.recurring && (
                        <NumberField
                            label="Frequency"
                            placeholder="7"
                            min={1}
                            max={365}
                            value={frequency}
                            onValueChange={(value) => {
                                setFrequency(value)
                                console.log(value)
                            }}
                            appends={<StyledAppendDays>Days</StyledAppendDays>}
                        />
                    )}

                </StyledContentContainer>
                <StyledActionContainer>
                    <Button label="Cancel" onClick={onCloseEvent} $outlined/>
                    <Button label="Remove" onClick={onRemoveEntryEvent} $secondary/>
                    <Button label="Save" onClick={onEditEntryEvent} $primary/>
                </StyledActionContainer>
            </StyledCard>
        </StyledDialog>
    )
}

export default EditEntryDialog;