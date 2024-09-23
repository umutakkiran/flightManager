import React from 'react'
import { TextTitle } from '../shared/Texts/Texts'
import CustomSelect from '../shared/CustomSelect'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useGenericQueryHook } from '../hooks/useGenericQueryHook';


function FilterSection({setFlightDirection, flightDirection, alignment}) {
    const { data: airlines, isLoading } = useGenericQueryHook("/api/airlines", "airlines")

    if (isLoading === false) {
    }

    function changeFlightDirection (e) {
        setFlightDirection(e)
    }
    return (
        <div className=' w-full flex flex-col gap-4 xl:overflow-y-auto h-[32rem]'>
            <div className=' flex flex-col gap-2'>
                <TextTitle>
                    Flight Direction:
                </TextTitle>
                {
                    alignment === "Round Trip" ?
                    <CustomSelect rightRadius leftRadius
                    data={[{value:" ", publicName:{english:"All"}},{value:"A", publicName:{english:"Arrival"}},{value:"D", publicName:{english:"Departure"}},]}
                    onChange={changeFlightDirection}
                    firstValue={flightDirection}
                    disabled={true}
                    />
                    :
                    <CustomSelect rightRadius leftRadius
                    data={[{value:" ", publicName:{english:"All"}},{value:"A", publicName:{english:"Arrival"}},{value:"D", publicName:{english:"Departure"}},]}
                    onChange={changeFlightDirection}
                    firstValue={flightDirection}
                    disabled={false}
                    />
                }
            </div>
            <div className=' flex flex-col gap-2'>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                        <TextTitle>
                            Arrival Time
                        </TextTitle>
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel  value="pre" control={<Radio style={{color:'var(--secondary-color)'}} />} label="5:00 - 11:59" />
                        <FormControlLabel  value="post" control={<Radio style={{color:'var(--secondary-color)'}} />} label="12:00 - 5:59" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className=' flex flex-col gap-2'>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                        <TextTitle>
                            Stops
                        </TextTitle>
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel  value="none" control={<Radio style={{color:'var(--secondary-color)'}} />} label="nonstop" />
                        <FormControlLabel  value="one" control={<Radio style={{color:'var(--secondary-color)'}} />} label="1 stop" />
                        <FormControlLabel  value="twoplus" control={<Radio style={{color:'var(--secondary-color)'}} />} label="2+ stop" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className=' flex flex-row xl:flex-col gap-2'>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                        <TextTitle>
                            Airlines Included
                        </TextTitle>
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        sx={{flexDirection:'row'}}
                    >
                        {
                            airlines?.data.airlines.map((airline, index) => (
                                <FormControlLabel  key={index} value={airline.iata} control={<Radio style={{color:'var(--secondary-color)'}} />} label={airline.publicName} />
                            ))
                        }
                    </RadioGroup>
                </FormControl>
            </div>

        </div>
    )
}

export default FilterSection