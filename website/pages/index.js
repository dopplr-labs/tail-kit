import React from 'react'
import { Button } from '@tail-kit/tail-kit'

export default function HomePage() {
  return (
    <div>
      <Button label="Hello World" buttonType={Button.ButtonType.primary} />
    </div>
  )
}
