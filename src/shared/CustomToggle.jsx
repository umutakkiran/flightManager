import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { TextBody } from './Texts/Texts';

function CustomToggle({ firstText, SecondText, alignment ,setAlignment }) {

    const handleChange = (
        event,
        newAlignment,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{
                '& .MuiToggleButton-root': {
                    borderColor: 'var(--primary-color)',
                    color: 'var(--primary-color)',
                    '&.Mui-selected': {
                        backgroundColor: 'var(--secondary-color)',
                        color: 'var(--secondary-color)',
                    },
                    textTransform: 'none',
                },
            }}
        >
            <ToggleButton sx={{ width: 100, borderRadius: 50, height:30 }} value={firstText}>
                <TextBody>
                    {firstText}
                </TextBody>
            </ToggleButton>
            <ToggleButton sx={{ width: 100, borderRadius: 50, height:30 }} value={SecondText}>
                <TextBody>
                    {SecondText}
                </TextBody>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default CustomToggle