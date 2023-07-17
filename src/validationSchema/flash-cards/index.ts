import * as yup from 'yup';

export const flashCardValidationSchema = yup.object().shape({
  english_word: yup.string().required(),
  user_id: yup.string().nullable(),
});
