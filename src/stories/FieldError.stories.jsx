import FieldError from '../components/FieldError';

export default {
  title: 'Components/FieldError',
  component: FieldError,
};

export const Default = {
  args: {
    message: 'Email wajib diisi',
  },
};

export const LongMessage = {
  args: {
    message: 'Password harus minimal 8 karakter, blablabla.',
  },
};

export const Empty = {
  args: {
    message: '',
  },
};
