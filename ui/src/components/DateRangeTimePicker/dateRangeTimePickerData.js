// DATE AND TIME
import moment from 'moment'

// export const dateRangeList = [
//   [
//     {
//       title: 'Yesterday',
//       startDate: moment().subtract(1, 'days').startOf('days').toDate(),
//       endDate: moment().subtract(1, 'days').endOf('days').toDate(),
//     },
//     {
//       title: 'Last week',
//       startDate: moment().subtract(1, 'weeks').startOf('week').toDate(),
//       endDate: moment().subtract(1, 'weeks').endOf('week').toDate(),
//     },
//     {
//       title: 'Last month',
//       startDate: moment().subtract(1, 'months').startOf('months').toDate(),
//       endDate: moment().subtract(1, 'months').endOf('months').toDate(),
//     },
//   ],
//   [
//     {
//       title: 'Today',
//       startDate: moment().startOf('day').toDate(),
//       endDate: moment().endOf('day').toDate(),
//     },
//     {
//       title: 'This week',
//       startDate: moment().startOf('week').toDate(),
//       endDate: moment().endOf('week').toDate(),
//     },
//     {
//       title: 'This month',
//       startDate: moment().startOf('month').toDate(),
//       endDate: moment().endOf('month').toDate(),
//     },
//   ],
//   [
//     {
//       title: 'Tomorrow',
//       startDate: moment().add(1, 'days').startOf('days').toDate(),
//       endDate: moment().add(1, 'days').endOf('days').toDate(),
//     },
//     {
//       title: 'Next week',
//       startDate: moment().add(1, 'weeks').startOf('weeks').toDate(),
//       endDate: moment().add(1, 'weeks').endOf('weeks').toDate(),
//     },
//     {
//       title: 'Next month',
//       startDate: moment().add(1, 'months').startOf('months').toDate(),
//       endDate: moment().add(1, 'months').endOf('months').toDate(),
//     },
//   ]
// ]

export const dateRangeList = [
  [
    {
      title: 'Last 7 Days',
      startDate: moment().subtract(6, 'days').startOf('days').toDate(),
      endDate: moment().endOf('days').toDate(),
    },
    {
      title: 'Last 14 Days',
      startDate: moment().subtract(13, 'days').startOf('days').toDate(),
      endDate: moment().endOf('days').toDate(),
    },
    {
      title: 'Last 30 Days',
      startDate: moment().subtract(29, 'days').startOf('days').toDate(),
      endDate: moment().endOf('days').toDate(),
    },
  ],
]

export const timeOptionList = [
  {
    text: '12:00 AM',
    time: '00:00:00',
  },
  {
    text: '12:30 AM',
    time: '00:30:00',
  },
  {
    text: '01:00 AM',
    time: '01:00:00',
  },
  {
    text: '01:30 AM',
    time: '01:30:00',
  },
  {
    text: '02:00 AM',
    time: '02:00:00',
  },
  {
    text: '02:30 AM',
    time: '02:30:00',
  },
  {
    text: '03:00 AM',
    time: '03:00:00',
  },
  {
    text: '03:30 AM',
    time: '03:30:00',
  },
  {
    text: '04:00 AM',
    time: '04:00:00',
  },
  {
    text: '04:30 AM',
    time: '04:30:00',
  },
  {
    text: '05:00 AM',
    time: '05:00:00',
  },
  {
    text: '05:30 AM',
    time: '05:30:00',
  },
  {
    text: '06:00 AM',
    time: '06:00:00',
  },
  {
    text: '06:30 AM',
    time: '06:30:00',
  },
  {
    text: '07:00 AM',
    time: '07:00:00',
  },
  {
    text: '07:30 AM',
    time: '07:30:00',
  },
  {
    text: '08:00 AM',
    time: '08:00:00',
  },
  {
    text: '08:30 AM',
    time: '08:30:00',
  },
  {
    text: '09:00 AM',
    time: '09:00:00',
  },
  {
    text: '09:30 AM',
    time: '09:30:00',
  },
  {
    text: '10:00 AM',
    time: '10:00:00',
  },
  {
    text: '10:30 AM',
    time: '10:30:00',
  },
  {
    text: '11:00 AM',
    time: '11:00:00',
  },
  {
    text: '11:30 AM',
    time: '11:30:00',
  },
  {
    text: '12:00 PM',
    time: '12:00:00',
  },
  {
    text: '12:30 PM',
    time: '12:30:00',
  },
  {
    text: '01:00 PM',
    time: '13:00:00',
  },
  {
    text: '01:30 PM',
    time: '13:30:00',
  },
  {
    text: '02:00 PM',
    time: '14:00:00',
  },
  {
    text: '02:30 PM',
    time: '14:30:00',
  },
  {
    text: '03:00 PM',
    time: '15:00:00',
  },
  {
    text: '03:30 PM',
    time: '15:30:00',
  },
  {
    text: '04:00 PM',
    time: '16:00:00',
  },
  {
    text: '04:30 PM',
    time: '16:30:00',
  },
  {
    text: '05:00 PM',
    time: '17:00:00',
  },
  {
    text: '05:30 PM',
    time: '17:30:00',
  },
  {
    text: '06:00 PM',
    time: '18:00:00',
  },
  {
    text: '06:30 PM',
    time: '18:30:00',
  },
  {
    text: '07:00 PM',
    time: '19:00:00',
  },
  {
    text: '07:30 PM',
    time: '19:30:00',
  },
  {
    text: '08:00 PM',
    time: '20:00:00',
  },
  {
    text: '08:30 PM',
    time: '20:30:00',
  },
  {
    text: '09:00 PM',
    time: '21:00:00',
  },
  {
    text: '09:30 PM',
    time: '21:30:00',
  },
  {
    text: '10:00 PM',
    time: '22:00:00',
  },
  {
    text: '10:30 PM',
    time: '22:30:00',
  },
  {
    text: '11:00 PM',
    time: '23:00:00',
  },
  {
    text: '11:30 PM',
    time: '23:30:00',
  },
  {
    text: '11:59 PM',
    time: '23:59:59',
  },
]
