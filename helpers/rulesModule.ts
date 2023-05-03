import { email, helpers, ipAddress, maxLength, minLength, numeric, required, sameAs } from '@vuelidate/validators';
import { Ref } from 'vue';

export default {
  req: helpers.withMessage('Field is required', required),
  email: helpers.withMessage('Invalid email format', email),
  num: helpers.withMessage('Должно быть числом', numeric),
  mil: (num: number) => helpers.withMessage(`Количество символов должно быть не меньше ${num}`, minLength(num)),
  mal: (num: number) => helpers.withMessage(`Количество символов должно быть не больше ${num}`, maxLength(num)),
  same: (propRef: Ref, nameInErr: string) => helpers.withMessage(`Должно быть одинаковым с ${nameInErr}`, sameAs(propRef)),
  ip: helpers.withMessage('Должен соответствовать IP', ipAddress)
};
