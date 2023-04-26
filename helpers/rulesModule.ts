import { email, helpers, required } from '@vuelidate/validators';

export default {
  required: (text: string) => helpers.withMessage(text, required),
  email: (text: string) => helpers.withMessage(text, email)
};
