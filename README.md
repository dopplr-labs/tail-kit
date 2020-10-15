<img src="./assets/tail-kit-logo.png" width="100px" />

# tail-kit

![Tests](https://github.com/abinashpanda/tail-kit/workflows/tests/badge.svg)
[![codecov](https://codecov.io/gh/abinashpanda/tail-kit/branch/develop/graph/badge.svg)](https://codecov.io/gh/abinashpanda/tail-kit)
[![NPM ](https://img.shields.io/npm/v/@tail-kit/tail-kit)](https://www.npmjs.com/package/@tail-kit/tail-kit)

UI kit built using `tailwindcss`

Demo - https://tail-kit.netlify.app

---

## Installation

Install tail-kit using

```sh
yarn add @tail-kit/tail-kit
```

or

```sh
npm install @tail-kit/tail-kit
```

## Usage

```jsx
import React, { useState } from 'react'
import { Button, Input, AtSymbolOutline, KeyOutline } from '@tail-kit/tail-kit'
// import the css or add it to the index.html file
import '@tail-kit/tail-kit/dist/tail-kit.css'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="space-y-4 w-80">
      <Input
        placeholder="Email"
        icon={<AtSymbolOutline />}
        value={email}
        onChange={(event) => {
          setEmail(event.target.value)
        }}
      />
      <Input
        placeholder="Password"
        icon={<KeyOutline />}
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      />
      <Button
        label="Login"
        className="w-full"
        buttonType={Button.ButtonType.primary}
        disabled={!email || !password}
      />
    </div>
  )
}
```

## Contributing

We are working on making this project fully open source. We appreciate any contributions you might make.

[Bug reports](https://github.com/abinashpanda/tail-kit/issues/new?template=bug_report.md) and [feature request](https://github.com/abinashpanda/tail-kit/issues/new?template=feature_request.md) are welcome but, please use the correct template.

Please check out our [Contribution Guide](./.github/contribution/README.md). It includes contribution guidelines and information on how to run and develop the project.

## Logo

<a href='https://www.freepik.com/vectors/logo'>Logo vector created by sentavio - www.freepik.com</a>
