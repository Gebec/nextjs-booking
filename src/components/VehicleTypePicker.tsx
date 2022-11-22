import styled from 'styled-components'

import { VehiclePickerTile } from './VehiclePickerTile'
import { Text } from './_LayoutComponents'

import type { TVehicleType } from '../../pages/api/interfaces'

const vehicleTypes: TVehicleType[] = ['Alcove', 'BuiltIn', 'Campervan', 'Intergrated']

export const VehicleTypePicker = () => {
  return (
    <Wrapper>
      <Text>Cena za den</Text>

      <Picker>
        {vehicleTypes.map((type: TVehicleType): React.ReactElement => {
          return <VehiclePickerTile key={type} type={type} />
        })}
      </Picker>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-grow: 1;
`

const Picker = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
  gap: var(--spacing-16);
  padding-top: var(--spacing-16);
`
