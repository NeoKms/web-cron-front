import {
  email,
  helpers,
  ipAddress,
  maxLength, maxValue,
  minLength,
  minValue,
  numeric,
  required,
  sameAs
} from '@vuelidate/validators';
import { Ref } from 'vue';

const cronTimeChecker = (value: string, regexp: RegExp) => {
  value = (value?.toString() || '').trim();
  const fnd = value.split(',').reduce((acc: string[], el) => {
    return acc.concat(el.split('-'));
  }, [] as string[]).find(num => !regexp.test(num));
  return !(!/^[0-9,-]+$/gi.test(value) || !!fnd || fnd === '');
};
export default {
  req: helpers.withMessage('Field is required', required),
  email: helpers.withMessage('Invalid email format', email),
  num: helpers.withMessage('Должно быть числом', numeric),
  mil: (num: number) => helpers.withMessage(`Количество символов должно быть не меньше ${num}`, minLength(num)),
  mal: (num: number) => helpers.withMessage(`Количество символов должно быть не больше ${num}`, maxLength(num)),
  same: (propRef: Ref, nameInErr: string) => helpers.withMessage(`Должно быть одинаковым с ${nameInErr}`, sameAs(propRef)),
  ip: helpers.withMessage('Должен соответствовать IP', ipAddress),
  miv: (num: number) => helpers.withMessage(`Значение не меньше ${num}`, minValue(num)),
  mav: (num: number) => helpers.withMessage(`Значение не больше ${num}`, maxValue(num)),
  cronTime: {
    min: helpers.withMessage('Неверный формат минут', (value: string) => cronTimeChecker(value, /^([1-9]|[1-5][0-9])$/gi)),
    hour: helpers.withMessage('Неверный формат часов', (value: string) => cronTimeChecker(value, /^([0-9]|1[0-9]|2[0-3])$/gi)),
    dom: helpers.withMessage('Неверный формат дней', (value: string) => cronTimeChecker(value, /^([1-9]|[1-2][0-9]|3[0-1])$/gi)),
    month: helpers.withMessage('Неверный формат месяца', (value: string) => cronTimeChecker(value, /^([1-9]|1[0-2])$/gi)),
    dow: helpers.withMessage('Неверный формат дня недели', (value: string) => cronTimeChecker(value, /^([0-6])$/gi))
  }
};
