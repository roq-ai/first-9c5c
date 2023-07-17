import * as yup from 'yup';

export const progressValidationSchema = yup.object().shape({
  learned_word: yup.string().required(),
  user_id: yup.string().nullable(),
});
