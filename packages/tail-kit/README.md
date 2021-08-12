# tail-kit

![Tests](https://github.com/dopplr-labs/tail-kit/workflows/tests/badge.svg)
[![codecov](https://codecov.io/gh/dopplr-labs/tail-kit/branch/develop/graph/badge.svg)](https://codecov.io/gh/dopplr-labs/tail-kit)
[![NPM ](https://img.shields.io/npm/v/@tail-kit/tail-kit)](https://www.npmjs.com/package/@tail-kit/tail-kit)

UI kit built using `tailwindcss`

Demo - https://tail-kit.web.app/

## Installation

`@tail-kit/tail-kit` depends on additional libraries like `react-icons` and `react-hook-form`. So install tail-kit using

```sh
yarn add @tail-kit/tail-kit react-icons react-hook-form
```

or

```sh
npm install @tail-kit/tail-kit react-icons react-hook-form --save
```

## Usage

```tsx
import React, { useState } from 'react'
import { Form, Input, Select, Button } from '@tail-kit/tail-kit'
// import the css or add it to the index.html file
import '@tail-kit/tail-kit/dist/tail-kit.css'

export default function App() {
  return (
    <>
      <div className="px-8 font-semibold text-gray-700">
        Create a new employee account
      </div>
      <Form
        onSubmit={onSubmit}
        layout={Form.Layout.VERTICAL}
        className="px-8 py-4"
      >
        <div className="flex w-full space-x-4">
          <Form.Item name="firstName" label="First Name" className="w-full">
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name" className="w-full">
            <Input placeholder="Enter last name" />
          </Form.Item>
        </div>
        <div className="flex w-full space-x-4">
          <Form.Item name="gender" label="Gender" className="w-full">
            <Select
              options={['Male', 'Female', 'Other']}
              placeholder="Select your gender"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            name="maritalStatus"
            label="Marital Status"
            className="w-full"
          >
            <Select
              options={['Single', 'Married']}
              placeholder="Select your marital status"
              className="w-full"
            />
          </Form.Item>
        </div>
        <div className="flex w-full space-x-4">
          <Form.Item name="phoneNumber" label="Phone Number" className="w-full">
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item name="email" label="Email Address" className="w-full">
            <Input placeholder="Enter email address" />
          </Form.Item>
        </div>
        <Form.Item name="pastExperience" label="Past Experience">
          <textarea
            className="w-full h-24 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2"
            placeholder="Please write employee's previous experience description"
          />
        </Form.Item>
        <div className="flex justify-end space-x-4">
          <Button>Cancel</Button>
          <Button type="submit" buttonType="primary">
            Submit
          </Button>
        </div>
      </Form>
    </>
  )
}
```
