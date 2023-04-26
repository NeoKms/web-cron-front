import { email, helpers, maxLength, minLength, numeric, required } from '@vuelidate/validators';

export default {
  req: helpers.withMessage('Field is required', required),
  email: helpers.withMessage('Invalid email format', email),
  num: helpers.withMessage('Должно быть числом', numeric),
  mil: (num: number) => helpers.withMessage(`Количество символов должно быть не меньше ${num}`, minLength(num)),
  mal: (num: number) => helpers.withMessage(`Количество символов должно быть не больше ${num}`, maxLength(num))
};
