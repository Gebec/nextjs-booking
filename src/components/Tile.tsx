import styled from 'styled-components'
import Image from 'next/image'

import { TileCarousel } from './TileCarousel'
import { IconWithText, Text } from './_LayoutComponents'
import { getVehicleTypeName } from '../utils/vehicle-type-detail'

import SeatIcon from '../../public/assets/Icon-Seat.svg'
import BedIcon from '../../public/assets/Icon-Bed.svg'
import ToiletIcon from '../../public/assets/Icon-Toilet.svg'
import ShowerIcon from '../../public/assets/Icon-Shower.svg'
import ActionIcon from '../../public/assets/Icon-Action.svg'

import type { ICaravan } from '../../pages/api/interfaces'

export const Tile = ({ data }: { data: ICaravan }) => {
  return (
    <TileWrapper>
      <ImageWrapper>
        <TileCarousel images={data.pictures} />
      </ImageWrapper>
      <ContentWrapper>
        <VehicleType>{getVehicleTypeName(data.vehicleType)}</VehicleType>
        <VehicleName>{data.name}</VehicleName>

        <HorizontalSeparator />

        <VehicleLocation>{data.location}</VehicleLocation>
        <AttributesWrapper>
          <IconWithText>
            <Image width={20} height={20} src={SeatIcon} alt="Passengers capacity"></Image>
            {data.passengersCapacity}
          </IconWithText>
          <IconWithText>
            <Image width={20} height={20} src={BedIcon} alt="Sleep capacity"></Image>
            {data.sleepCapacity}
          </IconWithText>
          {data.toilet ? <Image width={20} height={20} src={ToiletIcon} alt="With toilet"></Image> : null}
          {data.shower ? <Image width={20} height={20} src={ShowerIcon} alt="With shower"></Image> : null}
        </AttributesWrapper>

        <HorizontalSeparator />

        <PriceWrapper>
          <Text>Cena od</Text>
          <PriceValue>
            {data.price} Kč/den
            {data.instantBookable ? <Image width={20} height={20} src={ActionIcon} alt="Can be instantly booked"></Image> : null}
          </PriceValue>
        </PriceWrapper>
      </ContentWrapper>
    </TileWrapper>
  )
}

const TileWrapper = styled.article`
  border: 1px solid var(--c-beige);
  border-radius: var(--spacing-8);
  overflow: hidden;
`

const ContentWrapper = styled.div`
  padding: var(--spacing-12) var(--spacing-16);
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 190px;
  position: relative;

  background-color: var(--c-beige);
`

const VehicleType = styled.div`
  font-size: var(--fs-12);
  font-weight: var(--fw-bold);
  color: var(--c-orange);
  text-transform: uppercase;
`

const VehicleName = styled.h2`
  font-size: var(--fs-24);
  font-weight: var(--fw-bold);
  line-height: var(--spacing-32);

  margin: 0;
  padding-bottom: var(--spacing-4);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const HorizontalSeparator = styled.hr`
  width: 100%;
  border: 1px solid var(--c-beige);
`

const VehicleLocation = styled.div`
  font-size: var(--fs-12);

  padding: var(--spacing-8) 0;
`

const AttributesWrapper = styled.div`
  display: flex;
  gap: var(--spacing-12);
  padding-bottom: var(--spacing-16);
`

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding-top: var(--spacing-12);
`

const PriceValue = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-8);

  font-weight: var(--fw-bold);
`
