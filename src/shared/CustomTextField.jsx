import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

const CustomTextField = ({
    rightRadius,
    leftRadius,
    placeholder,
    data,
    width,
    height,
    radiusAmount,
    borderWidth,
    StartIcon,
}) => {
    // Border radius ayarları
    const borderRadiusStyle = {
        borderTopRightRadius: rightRadius ? radiusAmount || '16px' : '0',
        borderBottomRightRadius: rightRadius ? radiusAmount || '16px' : '0',
        borderTopLeftRadius: leftRadius ? radiusAmount || '16px' : '0',
        borderBottomLeftRadius: leftRadius ? radiusAmount || '16px' : '0',
    };

    return (
        <Box sx={{ width: width || 175, position: 'relative' }}>
            <Autocomplete
                disablePortal
                options={data}
                getOptionLabel={(option) => option.publicName?.english || ''}
                size='small'
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder || "Airport"}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <StartIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: height || 30,
                                width: width || 175,
                                backgroundColor: 'white',
                                borderWidth: borderWidth || 0,
                                ...borderRadiusStyle,
                                boxSizing: 'border-box',
                            },
                        }}
                    />
                )}
            />
        </Box>
    );
};

CustomTextField.propTypes = {
    rightRadius: PropTypes.bool,
    leftRadius: PropTypes.bool,
    placeholder: PropTypes.string,
    data: PropTypes.array,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    radiusAmount: PropTypes.string,
    borderWidth: PropTypes.string,
    StartIcon: PropTypes.elementType,
};

export default CustomTextField;
