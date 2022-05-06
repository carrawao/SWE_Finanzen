import React from "react"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"

const ChartButtons = (props) => {
return(
    <ToggleButtonGroup color="primary"
    value={props.view}
    exclusive
    onChange={(e,view)=>props.setView(view)}
    >
    <ToggleButton value="week">Week</ToggleButton>
    <ToggleButton value="month">Month</ToggleButton>
    <ToggleButton value="6month">6 Months</ToggleButton>
    <ToggleButton value="year">Year</ToggleButton>
    <ToggleButton value="all">All</ToggleButton>
    </ToggleButtonGroup>
    )
    
}
export default ChartButtons;