import { FormKitSchemaNode } from '@formkit/core';

export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export const loginSchema: FormKitSchemaNode[] = [
  {
    $el: 'div',
    attrs: {
      class: 'space-y-6',
    },
    children: [
      {
        $formkit: 'email',
        name: 'email',
        label: 'Email',
        validation: 'required|email',
        validationVisibility: 'live',
        placeholder: 'Enter your email',
        outerClass: 'mb-4',
        inputClass: 'w-full p-3 border border-gray-300 rounded-lg',
        labelClass: 'block mb-2 text-sm font-medium text-gray-900',
        messageClass: 'text-sm text-red-600',
      },
      {
        $formkit: 'password',
        name: 'password',
        label: 'Password',
        validation: 'required|length:6',
        validationVisibility: 'live',
        placeholder: 'Enter your password',
        outerClass: 'mb-4',
        inputClass: 'w-full p-3 border border-gray-300 rounded-lg',
        labelClass: 'block mb-2 text-sm font-medium text-gray-900',
        messageClass: 'text-sm text-red-600',
      },
      {
        $el: 'div',
        attrs: {
          class: 'flex items-center justify-between mt-4',
        },
        children: [
          {
            $formkit: 'checkbox',
            name: 'remember',
            label: 'Remember me',
            outerClass: 'mb-0',
            labelClass: 'text-sm text-gray-600',
          },
          {
            $el: 'a',
            attrs: {
              href: '#',
              class: 'text-sm text-primary hover:text-primary-dark',
            },
            children: 'Forgot password?',
          },
        ],
      },
      {
        $formkit: 'submit',
        label: 'Sign in',
        outerClass: 'mt-6',
        inputClass: 'w-full bg-primary text-white p-3 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50',
      },
    ],
  },
];
