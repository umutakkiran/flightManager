import React, { useState } from 'react'
import { Datepicker } from "flowbite-react";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { arrivalActions } from '../utils/slices/arrivalSlice';
import { departureActions } from '../utils/slices/departureSlice';

export default function CustomDatePicker({ rightRadius, leftRadius, disabled, type }) {
  const dispatch = useDispatch();
  const arrivalScheduleDate = useSelector((state) => state.arrival.arrivalDate);
  const departureScheduleDate = useSelector((state) => state.departure.departureDate);
  const [displayDate, setDisplayDate] = useState(type === 1 ? departureScheduleDate : arrivalScheduleDate);
  const customTheme = {
    "root": {
      "base": "relative text-base/6 text-sm "
    },
    "popup": {
      "root": {
        "base": "absolute top-10 -left-16 md:left-0 z-50 block pt-2",
        "inline": "relative top-0 z-auto",
        "inner": "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700"
      },
      "header": {
        "base": "",
        "title": "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
        "selectors": {
          "base": "mb-2 flex justify-between",
          "button": {
            "base": "rounded-lg bg-white px-5 py-2.5 text-xs font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
            "prev": "",
            "next": "",
            "view": ""
          }
        }
      },
      "view": {
        "base": "p-1 "
      },
      "footer": {
        "base": "mt-2 flex space-x-2",
        "button": {
          "base": "w-full rounded-lg px-5 py-2 text-center text-xs font-medium focus:ring-4 focus:ring-[#6420AA]",
          "today": "bg-[#6420AA] text-white hover:bg-[#6420AA] dark:bg-[#6420AA] dark:hover:bg-[#6420AA]",
          "clear": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        }
      }
    },
    "views": {
      "days": {
        "header": {
          "base": "mb-1 grid grid-cols-7",
          "title": "h-6 text-center text-xs font-medium leading-6 text-gray-500 dark:text-gray-400"
        },
        "items": {
          "base": "grid w-64 grid-cols-7",
          "item": {
            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-xs font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            "selected": "bg-[#6420AA] text-white hover:bg-[#6420AA]",
            "disabled": "text-gray-500"
          }
        }
      },
      "months": {
        "items": {
          "base": "grid w-64 grid-cols-4",
          "item": {
            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-xs font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            "selected": "bg-[#6420AA] text-white hover:bg-[#6420AA]",
            "disabled": "text-gray-500"
          }
        }
      },
      "years": {
        "items": {
          "base": "grid w-64 grid-cols-4",
          "item": {
            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-xs font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            "selected": "bg-[#6420AA] text-white hover:bg-[#6420AA]",
            "disabled": "text-gray-500"
          }
        }
      },
      "decades": {
        "items": {
          "base": "grid w-64 grid-cols-4",
          "item": {
            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-xs font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            "selected": "bg-[#6420AA] text-white hover:bg-[#6420AA]",
            "disabled": "text-gray-500"
          }
        }
      }
    }
  }


  const formatWithLeadingZero = (number) => {
    return number < 10 ? `0${number}` : number;
  }

  const handleDateChange = (e) => {
    const selectedDate = new Date(e);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day for comparison

    if (selectedDate < today) {
      toast.error('Seçilen tarih bugünden eski olamaz.');
      return;
    }

    const year = selectedDate.getFullYear();
    const month = formatWithLeadingZero(selectedDate.getMonth() + 1);
    const day = formatWithLeadingZero(selectedDate.getDate());

    const formattedDate = `${year}-${month}-${day}`;
    setDisplayDate(e)

    type === 1 ?
      dispatch(departureActions.changeDepartureDate(formattedDate))
      :
      dispatch(arrivalActions.changeArrivalDate(formattedDate))

  };

  function displayFormatDate(dateString) {
    if (!dateString) {
      return;
    }
    const date = new Date(dateString);
    const options = { month: 'short', day: '2-digit' };
    const formattedDate = date.toLocaleString('en-US', options);
    const year = date.getFullYear().toString(); // Son iki basamak
    return `${formattedDate}, ${year}`; // Virgül eklendi
  }


  return (

    <Datepicker
      theme={customTheme}
      onSelectedDateChanged={handleDateChange}
      value={type === 1 ? displayFormatDate(departureScheduleDate) : type === 2 ? displayFormatDate(arrivalScheduleDate) : null}
      placeholder={type === 1 ? (departureScheduleDate === null ? "Choose a date" : displayFormatDate(departureScheduleDate)) : (type === 2 && arrivalScheduleDate === null ? "Choose a date" : displayFormatDate(arrivalScheduleDate))}
      disabled={disabled ? disabled : false}
      className={disabled ? ` opacity-50` : ` hover:cursor-pointer`}
      style={{
        backgroundColor: 'white',
        textAlign: 'center',
        height: 30,
        width: 175,
        borderTopLeftRadius: leftRadius ? '16px' : '1px',
        borderTopRightRadius: rightRadius ? '16px' : '1px',
        borderBottomRightRadius: rightRadius ? '16px' : '1px',
        borderBottomLeftRadius: leftRadius ? '16px' : '1px',
      }}
      title="Plane Scape Datepicker"
    />

  );
}
