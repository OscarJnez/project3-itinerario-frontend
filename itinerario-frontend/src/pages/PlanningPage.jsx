import CalendarComponent from '../components/MainPlanningComponents/BodyPlanning/CalendarMain/CalendarMain'
import HeaderPlanning from '../components/MainPlanningComponents/HeaderPlanning/HeaderPlanning'
import ActivityMain from '../components/MainPlanningComponents/BodyPlanning/ActivityMain/ActivityMain'
import FlightMain from '../components/MainPlanningComponents/BodyPlanning/FlightMain/FlightMain'
import LodgingMain from '../components/MainPlanningComponents/BodyPlanning/LodgingMain/LodgingMain'
import LogInForm from '../components/GenericComponents/LogInForm/LogInForm'
import SignUpForm from '../components/GenericComponents/SignUpForm/SignUpForm'
import SummaryMain from '../components/MainPlanningComponents/BodyPlanning/SummaryMain/SummaryMain'
import Box from '@mui/material/Box'
import ButtonNavigation from '../components/GenericComponents/ButtonNavigation/ButtonNavigation'
import { useState, useEffect } from 'react'




export default function PlanningPage() {

    const [stepperStatus, setStepperStatus] = useState(0)
    useEffect(() => {
        console.log(stepperStatus)
    }, [stepperStatus])

    const handleNavigation = (textValue) => {
        if (textValue === "Back") {
            if (stepperStatus > 0) setStepperStatus(stepperStatus - 1)
        } else {
            if (stepperStatus <= 3) setStepperStatus(stepperStatus + 1)
        }
    }

    function renderButtons() {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-around', my: "40px" }}>
                {stepperStatus === 0 && <ButtonNavigation handleNavigation={handleNavigation} text={'Next'} />}
                {stepperStatus > 0 && stepperStatus < 4 && <>
                    <ButtonNavigation handleNavigation={handleNavigation} text={'Back'} />
                    <ButtonNavigation handleNavigation={handleNavigation} text={'Next'} />
                </>}
                {stepperStatus === 4 && <>
                    <ButtonNavigation handleNavigation={handleNavigation} text={'Back'} />
                    <ButtonNavigation handleNavigation={handleNavigation} text={'Go to Summary'} bgColor={"#4BB449"} />
                </>}
            </Box>
        )
    }

    return (

        <div>
            <HeaderPlanning stepperStatus={stepperStatus} />

            {/*            
             <LogInForm />
             <SummaryMain /> 
             <SignUpForm />
            */}


            {/* <CalendarComponent /> */}
            <FlightMain />
            {/* <LodgingMain />
            <ActivityMain /> */}

            {renderButtons()}

        </div>

    )
}
