import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import PropTypes from 'prop-types'
import { useState } from 'react';
import './FlightCard.css'

export default function FlightCard({ data, date, onSelect, isSelected, airlines, origin, destination }) {

    const [selected, setSelected] = useState(false)

    const handleClick = () => {
        setSelected(!selected)
        onSelect(data, !selected)
    }

    const numAirlines = airlines.length
    const randomAirline = Math.floor(Math.random() * numAirlines)
    const airlineRandom = airlines[randomAirline]

    const randomNumberFlight = Math.floor(Math.random() * (98979 - 12501 + 1)) + 12501;

    function convertHoursToHoursAndMinutes(hours) {
        const wholeHours = Math.floor(hours);
        const decimalMinutes = (hours - wholeHours) * 60;
        const roundedMinutes = Math.round(decimalMinutes);
    
        const hoursText = `${wholeHours} hr`;
        const minutesText = roundedMinutes > 0 ? ` ${roundedMinutes} min` : '';
    
        return `${hoursText}${minutesText}`;
    }
    
    const durationInHours = data.duration / 60
    const durationTwo = durationInHours.toFixed(2)
    const durationHoursFloat = parseFloat(durationTwo)
    const duration = convertHoursToHoursAndMinutes(durationHoursFloat)

    function getRandom24HourTime() {
        const randomHours = Math.floor(Math.random() * 24);
        const randomMinutes = Math.floor(Math.random() * 60);
    
        const formattedTime = `${String(randomHours).padStart(2, '0')}:${String(randomMinutes).padStart(2, '0')}`;
        return formattedTime;
    }
    
    const randomTime = getRandom24HourTime();


    return (
        <Card sx={{ py: 3, px: 1, minWidth: 300, maxWidth: 500, cursor: 'pointer', "&:hover": { border: isSelected ? '2px solid #1976d2' : '2px solid green' } }} className={isSelected ? 'selected' : 'unselected'} onClick={handleClick}>
            <CardContent>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px'}}>
                        <img src={airlineRandom.imageLogo} alt="" width={30}/>
                        <Typography variant='body2'>
                            {airlineRandom.name}
                        </ Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                        <Typography sx={{fontWeight: 'bold'}}>
                            {`${airlineRandom.code}${randomNumberFlight}`} 
                        </Typography>
                        <Typography sx={{fontWeight: 'bold'}}>
                            {date}
                        </Typography>
                        <Typography sx={{fontWeight: 'bold'}}>
                            {randomTime}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ marginY: '20px' }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '20px'}}>
                    <Box>
                        <Typography sx={{fontWeight: 'bold'}}>
                            {data.origin}
                        </Typography>
                        <Typography>
                            {origin}
                        </Typography>
                    </Box>
                    <Box>
                        <AirplanemodeActiveIcon fontSize="small" className="rotateRight" sx={{ fontSize: '60px', color: '#1976d2' }} />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                        <Typography sx={{fontWeight: 'bold'}}>
                            {data.destination}
                        </Typography>
                        <Typography>
                            {destination}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'end' }}>

                    <Typography variant='h5' sx={{mb: '5px'}}>{data.value} €</Typography>
                    <Typography> {duration} </Typography>

                </Box>
            </CardContent>
        </Card>
    );
}

FlightCard.propTypes = {
    data: PropTypes.object,
    classIcon: PropTypes.string,
    date: PropTypes.string,
    onSelect: PropTypes.func,
    isSelected: PropTypes.bool,
    airlines: PropTypes.array,
    origin: PropTypes.string,
    destination: PropTypes.string
}