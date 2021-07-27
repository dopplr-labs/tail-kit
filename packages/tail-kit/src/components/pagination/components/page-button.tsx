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
      buttonType={selected === page ? 'primary' : 'link'}
      className="page-button"
      onClick={onClick}
    >
      {page.toString()}
    </Button>
  )
}
