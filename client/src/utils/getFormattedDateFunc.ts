type FormattedDate = {
   year: number;
   month: number;
   day: number;
   hour: number;
   min: number;
   sec: number;
}

type Months = {
   Jan: number;
   Feb: number;
   Mar: number;
   Apr: number;
   May: number;
   Jun: number;
   Jul: number;
   Aug: number;
   Sep: number;
   Oct: number;
   Nov: number;
   Dec: number;
}

const months: Months = {
   Jan: 0,
   Feb: 1,
   Mar: 2,
   Apr: 3,
   May: 4,
   Jun: 5,
   Jul: 6,
   Aug: 7,
   Sep: 8,
   Oct: 10,
   Nov: 9,
   Dec: 11,
};

//takes in date string and returns date in unix format to provide to API
export const getFormattedDate = (date: Date | null): FormattedDate => {
   let currentDate = date + '';
   let arr = currentDate.split(' ');
   let timeComponents = arr[4];
   const currentMonth = months[arr[1] as keyof Months];
   const [hour, min, sec] = timeComponents.split(':');

   const result = {
      year: parseInt(arr[3]),
      month: currentMonth,
      day: parseInt(arr[2]),
      hour: parseInt(hour),
      min: parseInt(min),
      sec: parseInt(sec),
   };
   return result;
};
