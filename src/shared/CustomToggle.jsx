import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { TextBody } from './Texts/Texts';

function CustomToggle({ firstText, SecondText, alignment, setAlignment, setFlightDirection }) {

    const handleChange = (event, newAlignment) => {
        // Eğer seçilen buton zaten aktifse, değişiklik yapılmasın
        if (newAlignment === null) return;

        // Seçili buton kontrolü
        if (newAlignment === firstText) {
            setFlightDirection("D");
        } else {
            setFlightDirection(" ");
        }

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
            <ToggleButton sx={{ width: 100, borderRadius: 50, height: 30 }} value={firstText}>
                <TextBody>
                    {firstText}
                </TextBody>
            </ToggleButton>
            <ToggleButton sx={{ width: 100, borderRadius: 50, height: 30 }} value={SecondText}>
                <TextBody>
                    {SecondText}
                </TextBody>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default CustomToggle;
