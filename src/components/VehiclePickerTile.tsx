import { useState } from 'react'
import styled from 'styled-components'

import { vehicleTypeDetail } from '../utils/vehicle-type-detail'

import type { TVehicleType } from '../../pages/api/interfaces'

type TProps = { type: TVehicleType; toggleVehicleType(type: TVehicleType): boolean }

export const VehiclePickerTile = ({ type, toggleVehicleType }: TProps) => {
  const [isActive, setStatus] = useState(false)
  const typeDetail: { name: string; description: string } = vehicleTypeDetail[type]

  const handleOnClick = () => {
    setStatus(toggleVehicleType(type))
  }

  return (
    <Tile isActive={isActive} onClick={handleOnClick}>
      <Name>{typeDetail.name}</Name>
      <Description>{typeDetail.description}</Description>
    </Tile>
  )
}

const Tile = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);

  border-radius: var(--spacing-8);

  padding: var(--spacing-12);
  cursor: pointer;

  ${(props: { isActive: boolean }) => (props.isActive ? `outline: 2px solid var(--c-green)` : `outline: 1px solid var(--c-beige)`)}
`
const Name = styled.div`
  font-size: var(--fs-16);
`

const Description = styled.p`
  font-size: var(--fs-12);
  color: var(--c-dark-grey);
`
