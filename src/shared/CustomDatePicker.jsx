import * as React from 'react';
import { Datepicker } from "flowbite-react";

export default function CustomDatePicker({ rightRadius, leftRadius, setScheduleDate }) {

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

  return (

    <Datepicker
      theme={customTheme}
      onSelectedDateChanged={(e) => {
        const year = e.getFullYear();
        const month = formatWithLeadingZero(e.getMonth() + 1); // Aylar 0'dan başladığı için +1 ekledik
        const day = formatWithLeadingZero(e.getDate());

        const formattedDate = `${year}-${month}-${day}`;
        setScheduleDate(formattedDate);
        console.log(formattedDate);
      }}
      className=' hover:cursor-pointer'
      style={{
        backgroundColor: 'white',
        textAlign: 'end',
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
