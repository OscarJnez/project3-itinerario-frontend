import FlightCard from '../../../GenericComponents/FlightCard/FlightCard'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import InfoMessage from '../../../GenericComponents/InfoMessage/InfoMessage';
import { useContext, useEffect, useState } from 'react';
/* import fetchData from '../../../../services/flightExternalService'; */
import fetchDataV2 from '../../../../services/flightExternalServiceV2';
import { mainContext } from '../../../../contexts/mainContext';

function FlightMain() {

    const { mainData, setMainData } = useContext(mainContext)
    const [selectedFlight, setSelectedFlight] = useState(false)

    const origin = mainData.origin.cityCode;
    const destination = mainData.destination.cityCode
    const dateGo = mainData.dateGoing
    const dateReturn = mainData.dateBack

    console.log(dateGo)
    console.log(dateReturn)

    const handleFlightSelect = (flight, isOneWay) => {
        if (selectedFlight === flight) {
            setSelectedFlight(null);
            setMainData((prevData) => ({
                ...prevData,
                flightGoing: isOneWay ? null : prevData.flightGoing,
                flightBack: !isOneWay ? null : prevData.flightBack,
            }));
        } else {
            // Seleccionar el nuevo vuelo
            setSelectedFlight(flight);
            setMainData((prevData) => ({
                ...prevData,
                flightGoing: isOneWay ? flight : prevData.flightGoing,
                flightBack: !isOneWay ? flight : prevData.flightBack,
            }));
        }

    }

    const [flightListOneWay, setFlightListOneWay] = useState([])
    const [flightListReturn, setFlightListReturn] = useState([])

    /*     useEffect(() => {
            fetchData('MAD', 'BCN', '2023-12-20', setFlightListOneWay)
            fetchData('BCN', 'MAD', '2023-12-21', setFlightListReturn)
        }, []) */

    useEffect(() => {
        fetchDataV2(origin, destination, dateGo, setFlightListOneWay)
        fetchDataV2(destination, origin, dateReturn, setFlightListReturn)
    }, [])

    const renderFlightListOneWay = (flightList) => {
        console.log("ida", flightList)
        return flightList.filter((flight) => flight.depart_date === mainData.dateGoing)

            .map((flight, index) => {
                console.log(flight)
                return (
                    <FlightCard
                        key={index}
                        data={flight}
                        date={flight.depart_date}
                        classIcon={'rotarDcha'}
                        onSelect={(selectedFlight) => handleFlightSelect(selectedFlight, true)}
                        isSelected={selectedFlight === flight}
                    />
                )
            })
    }

    const renderFlightListReturn = (flightList) => {
        return flightList.filter((flight) => flight.depart_date === mainData.dateBack)
            .map((flight, index) => {
                return (
                    <FlightCard
                        key={index}
                        data={flight}
                        date={flight.depart_date}
                        classIcon={'rotarIzq'}
                        onSelect={(selectedFlight) => handleFlightSelect(selectedFlight, false)}
                        isSelected={selectedFlight === flight}
                    />
                )

            })

    }

    return (
        <Box sx={{ px: 10 }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant='h3'>Fly to your destination</Typography>
            </Box>
            <InfoMessage />
            <Box sx={{ mb: 10 }}>
                {/* IDA  */}
                <Box sx={{ mb: 10 }}>
                    <Typography variant='h4' sx={{ mb: 2 }}>One-Way</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {renderFlightListOneWay(flightListOneWay)}
                    </Box>
                </Box>
                {/* VUELTA  */}
                <Box>
                    <Typography variant='h4' sx={{ mb: 2 }}>Return</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {renderFlightListReturn(flightListReturn)}
                    </Box>
                </Box>
            </Box>
        </Box>
    )

}

export default FlightMain