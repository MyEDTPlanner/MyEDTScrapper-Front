import {
    Box,
    Typography
} from '@mui/material';
import { EventInterface } from '../models/EventInterface';
import { formatAttendeeName, formatTitleAbbreviation } from '../utils/format';

interface Props {
    selectedEvent: EventInterface | null;
}

export const PreviewTabPanel = ({selectedEvent}: Props) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between'}}>
            <Box sx={{backgroundColor: 'blue', p: 3, flexShrink: 0}}>
                <Typography>Apperçu</Typography>
                <Typography>{selectedEvent?.title}</Typography>
                <Typography>{selectedEvent?.locations}</Typography>
                <Typography>{selectedEvent?.type}</Typography>
                <Typography>{selectedEvent?.attendees.map(name => formatAttendeeName(name)).join(', ')}</Typography>
                <Typography>{selectedEvent?.code}</Typography>
            </Box>
            <Box sx={{backgroundColor: 'red', minHeight: '250px', maxHeight: '35vh', flexGrow: 1}}>

            </Box>
        </Box>
    );
}