import React from 'react'
import Button from 'components/button'

export default function PageButton({
  page,
  selected,
  onClick,
}: {
  page: number
  selected: number
  onClick: () => void
}) {
  return (
    <Button
      label={page.toString()}
      buttonType={
        selected === page ? Button.ButtonType.primary : Button.ButtonType.link
      }
      onClick={onClick}
    />
  )
}
