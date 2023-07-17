import IconButton from "@/components/Basic/Button/IconButton";
import TextField from "@/components/Basic/TextField/TextField";
import useClickedOutsideEvent from "@/lib/useClickedOutsideEvent";
import {useEffect, useRef, useState} from "react";
import {ChromePicker, ColorResult} from 'react-color';
import {MdColorLens} from "react-icons/md";
import styled from "styled-components";


const StyledColorPickerWrapper = styled.div`
  position: relative;
`

const StyledCurrentColor = styled.div<{ $color: string }>`
  width: 2rem;
  aspect-ratio: 1/1;

  border-radius: 25%;

  margin-left: .5rem;

  background: ${props => props.$color};
`

const StyledColorPickerButton = styled(IconButton)`
  margin-right: .5rem;
`

const StyledChromePicker = styled(ChromePicker)`
  position: absolute;

  z-index: 1;

  top: 100%;
  right: 0;
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
            <StyledColorPickerWrapper>
                <TextField
                    label="Farbe"
                    value={localColor}
                    prepends={<StyledCurrentColor $color={localColor}/>}
                    appends={
                        <StyledColorPickerButton
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            Icon={
                                <MdColorLens
                                    size="24px"
                                />}
                        />}
                />

                {showColorPicker && (
                    <div ref={wrapperRef}>
                        <StyledChromePicker
                            color={localColor}
                            onChangeComplete={onColorChangeEvent}
                            disableAlpha
                        />
                    </div>
                )}
            </StyledColorPickerWrapper>
        </>
    )
}

export default ColorPicker;