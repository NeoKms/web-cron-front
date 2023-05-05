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
    min: helpers.withMessage('Неверный формат минут', (value: string) => {
      value = (value?.toString() || '').trim();
      const isDelimiter = value.match(/\//gi);
      if (Array.isArray(isDelimiter) && isDelimiter.length > 1) {
        return false;
      }
      if (value.includes('/')) {
        console.log('val in validator', value);
      }
      return true;
    })
  }
};
