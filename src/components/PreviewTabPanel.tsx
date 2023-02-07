import {
    Box,
    Typography,
    Paper
} from '@mui/material';
import { EventInterface } from '../models/EventInterface';
import { formatAttendeeName, formatTitleAbbreviation } from '../utils/format';
import { MapboxMap } from './MapboxMap';
 


interface Props {
    selectedEvent: EventInterface | null;
}

export const PreviewTabPanel = ({selectedEvent}: Props) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between'}}>
            <Box sx={{ p: 3, flexShrink: 0}}>
                <Typography>Apperçu</Typography>
                <Typography>{selectedEvent?.title}</Typography>
                <Typography>{selectedEvent?.locations}</Typography>
                <Typography>{selectedEvent?.type}</Typography>
                <Typography>{selectedEvent?.attendees.map(name => formatAttendeeName(name)).join(', ')}</Typography>
                <Typography>{selectedEvent?.code}</Typography>
            </Box>
            <Box sx={{ minHeight: '300px', maxHeight: '35vh', flexGrow: 1, px: 1, py: 1}}>
                <MapboxMap locations={selectedEvent?.locations} />
            </Box>
        </Box>
    );
}