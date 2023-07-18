"use client"

import Calendar from "@/components/Calendar/Calendar";
import TimeSelector from "@/components/TimeSelector/TimeSelector";
import StatsBar from "@/components/Stats/StatsBar";
import styled from "styled-components";

const StyledPageContainer = styled.div`
  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`

const HomePage = () => {
    return (
        <StyledPageContainer>
            <TimeSelector/>
            <StatsBar/>
            <Calendar/>
        </StyledPageContainer>
    )
}

export default HomePage;
