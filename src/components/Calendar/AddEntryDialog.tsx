"use client"

import {Dialog} from "@headlessui/react";
import styled from "styled-components";
import {rgba} from "polished";
import Card from "@/components/Basic/Card/Card";
import Button from "@/components/Basic/Button/Button";

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
const StyledContentContainer = styled.div`
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
}

const AddEntryDialog = ({show = false, ...props}: DialogProps) => {
    const onCloseEvent = () => {
        if (props.onClose) props.onClose();
    }

    return (
        <StyledDialog open={show} onClose={onCloseEvent}>
            <StyledCard>
                <StyledContentContainer>
                    <h1>Test</h1>
                </StyledContentContainer>
                <StyledActionContainer>
                    <Button label="Cancel" onClick={onCloseEvent} $outlined/>
                    <Button label="Add" $primary/>
                </StyledActionContainer>
            </StyledCard>
        </StyledDialog>
    )
}

export default AddEntryDialog;