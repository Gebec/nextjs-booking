import styled from 'styled-components'

import { VehiclePickerTile } from './VehiclePickerTile'
import { Text } from './_LayoutComponents'

import type { TVehicleType } from '../../pages/api/interfaces'

const vehicleTypes: TVehicleType[] = ['Alcove', 'BuiltIn', 'Campervan', 'Intergrated']

type TProps = {
  toggleVehicleType(type: TVehicleType): boolean
}

export const VehicleTypePicker = ({ toggleVehicleType }: TProps) => {
  return (
    <div>
      <Text>Cena za den</Text>

      <TypePickerWrapper>
        {vehicleTypes.map((type: TVehicleType): React.ReactElement => {
          return <VehiclePickerTile key={type} type={type} toggleVehicleType={toggleVehicleType} />
        })}
      </TypePickerWrapper>
    </div>
  )
}

const TypePickerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
  grid-auto-flow: column;
  gap: var(--spacing-16);
  padding-top: var(--spacing-16);
`
