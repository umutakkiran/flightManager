import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';

const CustomSelect = ({ rightRadius, leftRadius, startIcon: StartIcon, label, placeholder, data, onChange, firstValue, disabled, width, height, radiusAmount, borderWidth }) => {
  const [value, setValue] = React.useState(firstValue);

  const handleChange = (event) => {
    onChange(event.target.value)
    setValue(event.target.value);
  };

  // Calculate border radius based on props
  const borderRadiusStyle = {
    borderTopRightRadius: rightRadius ? radiusAmount ? radiusAmount : '16px' : '0',
    borderBottomRightRadius: rightRadius ? radiusAmount ? radiusAmount : '16px' : '0',
    borderTopLeftRadius: leftRadius ? radiusAmount ? radiusAmount : '16px' : '0',
    borderBottomLeftRadius: leftRadius ? radiusAmount ? radiusAmount : '16px' : '0',
  };

  return (
    <Box sx={{ minWidth: width ? width : 120 }}>
      <FormControl fullWidth>
        <InputLabel id="custom-select-label">{label ? label : null}</InputLabel>
        <Select
          labelId="custom-select-label"
          id="custom-select"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled ? disabled : false}
          startAdornment={StartIcon ? (
            <InputAdornment position="start">
              <StartIcon />
            </InputAdornment>
          ) : null}
          sx={[borderRadiusStyle, { height: height ? height : 30, width: width ? width : { xs: 175, lg: 200 }, backgroundColor:'white', borderWidth: borderWidth ? borderWidth : null }]} // Apply border radius styling
        >
          {
            data &&
            data.map((data, index) => (
              <MenuItem value={data?.value}>{data?.publicName.english}</MenuItem>
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
