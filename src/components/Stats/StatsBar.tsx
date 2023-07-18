"use client"

import Card from "@/components/Basic/Card/Card";
import styled from "styled-components";
import useCurrentMonthStats from "@/lib/Stats/useCurrentMonthStats";
import {useEffect, useState} from "react";
import {formatValue} from "react-currency-input-field";
import useSelectedDayStats from "@/lib/Stats/useSelectedDayStats";

const StyledCard = styled(Card)`
  width: auto;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  justify-content: center;
  align-items: center;
`

type StatsBarProps = {}

const StatsBar = (props: StatsBarProps) => {
    const currentMonthStats = useCurrentMonthStats();
    const selectedDayStats = useSelectedDayStats();

    const [endOfMonthTotal, setEndOfMonthTotal] = useState<string>("0 €");
    const [endOfDayTotal, setEndOfDayTotal] = useState<string>("0 €");

    useEffect(() => {
        if (currentMonthStats) {
            const formattedTotal = formatValue({
                value: currentMonthStats.total.toString(),
                suffix: '€',
            })
            setEndOfMonthTotal(formattedTotal)
        }
    }, [currentMonthStats]);

    useEffect(() => {
        if (selectedDayStats) {
            const formattedTotal = formatValue({
                value: selectedDayStats.total.toString(),
                suffix: '€',
            })
            setEndOfDayTotal(formattedTotal)
        }
    }, [selectedDayStats]);

    return (
        <Card>
            <h1>Total at the end of the month</h1>
            {endOfMonthTotal}

            <h1>Total at the end of day</h1>
            {endOfDayTotal}
        </Card>
    );
}

export default StatsBar;