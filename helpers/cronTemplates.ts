export default [
  {
    name: 'По минутам',
    items: [
      {
        name: 'Каждую минуту',
        tmp: {
          minute: '*',
          hour: '*',
          day: '*',
          month: '*',
          weekDay: '*'
        }
      },
      {
        name: 'Каждые 5 минут',
        tmp: {
          minute: '*/5',
          hour: '*',
          day: '*',
          month: '*',
          weekDay: '*'
        }
      },
      {
        name: 'Каждые 10 минут',
        tmp: {
          minute: '*/10',
          hour: '*',
          day: '*',
          month: '*',
          weekDay: '*'
        }
      },
      {
        name: 'Каждые 15 минут',
        tmp: {
          minute: '*/15',
          hour: '*',
          day: '*',
          month: '*',
          weekDay: '*'
        }
      },
      {
        name: 'Каждые 30 минут',
        tmp: {
          minute: '*/30',
          hour: '*',
          day: '*',
          month: '*',
          weekDay: '*'
        }
      }
    ]
  },
  {
    name: 'По часам',
    items: [
      {
        name: 'Каждый час',
        tmp: {
          minute: '*',
          hour: '1/*',
          day: '*',
          month: '*',
          weekDay: '*'
        }
      },
      {
        name: 'Каждые 2 часа',
        tmp: {
          minute: '*',
          hour: '2/*',
          day: '*',
          month: '*',
          weekDay: '*'
        }
      },
      {
        name: 'Каждые 3 часа',
        tmp: {
          minute: '*',
          hour: '3/*',
          day: '*',
          month: '*',
          weekDay: '*'
        }
      },
      {
        name: 'Каждые 4 часа',
        tmp: {
          minute: '4',
          hour: '2/*',
          day: '*',
          month: '*',
          weekDay: '*'
        }
      },
      {
        name: 'Каждые 6 часов',
        tmp: {
          minute: '*',
          hour: '6/*',
          day: '*',
          month: '*',
          weekDay: '*'
        }
      },
      {
        name: 'Каждые 8 часов',
        tmp: {
          minute: '*',
          hour: '8/*',
          day: '*',
          month: '*',
          weekDay: '*'
        }
      },
      {
        name: 'Каждые 12 часов',
        tmp: {
          minute: '*',
          hour: '12/*',
          day: '*',
          month: '*',
          weekDay: '*'
        }
      }
    ]
  },
  {
    name: 'По дням',
    items: [
      {
        name: 'Каждый день',
        tmp: {
          minute: '*',
          hour: '*',
          day: '1/*',
          month: '*',
          weekDay: '*'
        }
      },
      {
        name: 'Каждый полдень',
        tmp: {
          minute: '*',
          hour: '12',
          day: '1/*',
          month: '*',
          weekDay: '*'
        }
      },
      {
        name: 'Каждую полночь',
        tmp: {
          minute: '*',
          hour: '*',
          day: '1/*',
          month: '*',
          weekDay: '*'
        }
      },
      {
        name: 'Каждый понедельник',
        tmp: {
          minute: '*',
          hour: '*',
          day: '*',
          month: '*',
          weekDay: '1/*'
        }
      },
      {
        name: 'Каждую субботу',
        tmp: {
          minute: '*',
          hour: '*',
          day: '*',
          month: '*',
          weekDay: '6/*'
        }
      }
    ]
  }
];
