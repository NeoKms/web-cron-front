export default [
  {
    name: 'По минутам',
    items: [
      {
        name: 'Каждую минуту',
        tmp: {
          minute: {
            value: '*',
            period: false
          },
          hour: {
            value: '*',
            period: false
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
        }
      },
      {
        name: 'Каждые 5 минут',
        tmp: {
          minute: {
            value: '5',
            period: true
          },
          hour: {
            value: '*',
            period: false
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
        }
      },
      {
        name: 'Каждые 10 минут',
        tmp: {
          minute: {
            value: '10',
            period: true
          },
          hour: {
            value: '*',
            period: false
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
        }
      },
      {
        name: 'Каждые 15 минут',
        tmp: {
          minute: {
            value: '15',
            period: true
          },
          hour: {
            value: '*',
            period: false
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
        }
      },
      {
        name: 'Каждые 30 минут',
        tmp: {
          minute: {
            value: '30',
            period: true
          },
          hour: {
            value: '*',
            period: false
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
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
          minute: {
            value: '*',
            period: false
          },
          hour: {
            value: '1',
            period: true
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
        }
      },
      {
        name: 'Каждые 2 часа',
        tmp: {
          minute: {
            value: '*',
            period: false
          },
          hour: {
            value: '2',
            period: true
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
        }
      },
      {
        name: 'Каждые 3 часа',
        tmp: {
          minute: {
            value: '*',
            period: false
          },
          hour: {
            value: '3',
            period: true
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
        }
      },
      {
        name: 'Каждые 4 часа',
        tmp: {
          minute: {
            value: '*',
            period: false
          },
          hour: {
            value: '4',
            period: true
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
        }
      },
      {
        name: 'Каждые 6 часов',
        tmp: {
          minute: {
            value: '*',
            period: false
          },
          hour: {
            value: '6',
            period: true
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
        }
      },
      {
        name: 'Каждые 8 часов',
        tmp: {
          minute: {
            value: '*',
            period: false
          },
          hour: {
            value: '8',
            period: true
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
        }
      },
      {
        name: 'Каждые 12 часов',
        tmp: {
          minute: {
            value: '*',
            period: false
          },
          hour: {
            value: '12',
            period: true
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
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
          minute: {
            value: '0',
            period: false
          },
          hour: {
            value: '0',
            period: false
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
        }
      },
      {
        name: 'Каждый полдень',
        tmp: {
          minute: {
            value: '0',
            period: false
          },
          hour: {
            value: '12',
            period: false
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
        }
      },
      {
        name: 'Каждую полночь',
        tmp: {
          minute: {
            value: '0',
            period: false
          },
          hour: {
            value: '0',
            period: false
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '*',
            period: false
          }
        }
      },
      {
        name: 'Каждый понедельник',
        tmp: {
          minute: {
            value: '0',
            period: false
          },
          hour: {
            value: '0',
            period: false
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '1',
            period: false
          }
        }
      },
      {
        name: 'Каждую субботу',
        tmp: {
          minute: {
            value: '0',
            period: false
          },
          hour: {
            value: '0',
            period: false
          },
          day: {
            value: '*',
            period: false
          },
          month: {
            value: '*',
            period: false
          },
          weekDay: {
            value: '6',
            period: false
          }
        }
      }
    ]
  }
];
