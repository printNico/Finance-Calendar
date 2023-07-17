import styled from "styled-components";
import TextField from "@/components/Basic/TextField/TextField";
import {useEffect, useRef, useState} from "react";
import {ChromePicker, ColorResult} from 'react-color';
import useClickedOutsideEvent from "@/lib/useClickedOutsideEvent";


const StyledColorPickerWrapper = styled.div`
  position: relative;
`

const StyledTextField = styled(TextField)`
`

const StyledColorPickerContainer = styled.div`
`

const StyledChromePicker = styled(ChromePicker)`
  position: absolute;

  z-index: 1;

  top: 0;
  left: 0;
`

type ColorPickerProps = {
    color?: string;
    onColorChange?: (color: string) => void;
}


const ColorPicker = (props: ColorPickerProps) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [localColor, setLocalColor] = useState("#ffffff");

    const onClickedOutside = () => {
        setShowColorPicker(false);
    }

    const wrapperRef = useRef(null);
    useClickedOutsideEvent(wrapperRef, onClickedOutside);

    const onColorChangeEvent = (color: ColorResult) => {
        let hexCode = color.hex;
        if (props.onColorChange) {
            props.onColorChange(hexCode);
        }
        setLocalColor(hexCode);
    }

    useEffect(() => {
        setLocalColor(props.color ?? "#ffffff");
    }, [props.color]);

    return (
        <>
            <StyledColorPickerWrapper ref={wrapperRef}>
                <StyledTextField
                    label="Farbe"
                    value={localColor}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                />

                {showColorPicker && (
                    <StyledColorPickerContainer>
                        <StyledChromePicker
                            color={localColor}
                            onChangeComplete={onColorChangeEvent}
                            disableAlpha
                        />
                    </StyledColorPickerContainer>
                )}
            </StyledColorPickerWrapper>
        </>
    )
}

export default ColorPicker;