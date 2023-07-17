import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createProgress } from 'apiSdk/progresses';
import { Error } from 'components/error';
import { progressValidationSchema } from 'validationSchema/progresses';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { ProgressInterface } from 'interfaces/progress';

function ProgressCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProgressInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProgress(values);
      resetForm();
      router.push('/progresses');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProgressInterface>({
    initialValues: {
      learned_word: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: progressValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Progress
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="learned_word" mb="4" isInvalid={!!formik.errors?.learned_word}>
            <FormLabel>Learned Word</FormLabel>
            <Input type="text" name="learned_word" value={formik.values?.learned_word} onChange={formik.handleChange} />
            {formik.errors.learned_word && <FormErrorMessage>{formik.errors?.learned_word}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'progress',
    operation: AccessOperationEnum.CREATE,
  }),
)(ProgressCreatePage);
