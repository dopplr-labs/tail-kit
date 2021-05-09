import React from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import { render, screen } from '@testing-library/react'
import Tooltip from 'components/tooltip'
import { AnnotationSolid, UserOutline } from 'components/icons'
import Avatar from '.'

test('render avatar with children correctly', () => {
  render(<Avatar>KU</Avatar>)
  expect(screen.getByText('KU')).toBeInTheDocument()
})

test('render avatar with size large correctly', () => {
  render(
    <Avatar
      src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
      alt="User Thumbnail"
      size="large"
    />,
  )
  expect(screen.getByAltText('User Thumbnail').parentElement).toHaveClass(
    'w-12 h-12',
  )
})

test('render avatar with size small correctly', () => {
  render(<Avatar size="small">KU</Avatar>)
  expect(screen.getByText('KU')).toHaveClass('w-6 h-6')
})

test('render avatar with size default correctly', () => {
  render(<Avatar size="default">KU</Avatar>)
  expect(screen.getByText('KU')).toHaveClass('w-8 h-8')
})

test('render avatar with square shape correctly', () => {
  render(
    <Avatar
      shape="square"
      src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
      alt="User Thumbnail"
    />,
  )
  expect(
    screen.getByAltText('User Thumbnail').classList.contains('rounded-full'),
  ).toBe(false)
})

// Write testing logics for below
test('render icon in avatar working correctly', () => {
  render(<Avatar icon={<AiOutlineDown />} />)
})

test('render blank avatar correctly', () => {
  render(<Avatar />)
})

test('render avatar-group correctly', () => {
  render(
    <Avatar.Group>
      <Avatar src="https://randomuser.me/api/portraits/thumb/men/75.jpg" />
      <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutline />} />
      <Avatar
        style={{ backgroundColor: '#1890ff' }}
        icon={<AnnotationSolid />}
      />
    </Avatar.Group>,
  )
})

test('render avatar-group with few hidden avatars correctly', () => {
  render(
    <Avatar.Group
      maxCount={2}
      maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
      size="large"
      maxPopoverPlacement="bottom"
    >
      <Avatar src="https://randomuser.me/api/portraits/thumb/men/75.jpg" />
      <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
      <Tooltip title="Brad Gibson" placement="bottom">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutline />} />
      </Tooltip>
      <Avatar
        style={{ backgroundColor: '#1890ff' }}
        icon={<AnnotationSolid />}
      />
    </Avatar.Group>,
  )
})
