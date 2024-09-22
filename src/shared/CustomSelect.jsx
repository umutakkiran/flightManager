import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';

const CustomSelect = ({ rightRadius, leftRadius, startIcon: StartIcon, label, placeholder, data }) => {
  const [value, setValue] = React.useState(10);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // Calculate border radius based on props
  const borderRadiusStyle = {
    borderTopRightRadius: rightRadius ? '16px' : '0',
    borderBottomRightRadius: rightRadius ? '16px' : '0',
    borderTopLeftRadius: leftRadius ? '16px' : '0',
    borderBottomLeftRadius: leftRadius ? '16px' : '0',
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="custom-select-label">{label ? label : null}</InputLabel>
        <Select
          labelId="custom-select-label"
          id="custom-select"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          startAdornment={StartIcon ? (
            <InputAdornment position="start">
              <StartIcon />
            </InputAdornment>
          ) : null}
          sx={[borderRadiusStyle, { height: 30, width: { xs: 175, lg: 200 }, backgroundColor:'white' }]} // Apply border radius styling
        >
          {
            data &&
            data.map((data, index) => (
              <MenuItem value={data?.publicName.english}>{data?.publicName.english}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  );
};

// Define prop types
CustomSelect.propTypes = {
  rightRadius: PropTypes.bool,
  leftRadius: PropTypes.bool,
  startIcon: PropTypes.elementType,
  label: PropTypes.string,
};

export default CustomSelect;
