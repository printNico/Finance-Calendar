"use client"

import Calendar from "@/components/Calendar/Calendar";
import TimeSelector from "@/components/TimeSelector/TimeSelector";
import StatsBar from "@/components/Stats/StatsBar";
import styled from "styled-components";
import {rgba} from "polished";

const StyledHeaderContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;

  width: 100%;

  box-shadow: 0 0 15px 5px ${props => rgba(props.theme.colors.background3, 0.75)}
`

const StyledCalendar = styled(Calendar)`
  padding: 1.5rem
`

const HomePage = () => {
    return (
        <>
            <StyledHeaderContainer>
                <TimeSelector/>
                <StatsBar/>
            </StyledHeaderContainer>

            <StyledCalendar/>
        </>
    )
}

export default HomePage;
