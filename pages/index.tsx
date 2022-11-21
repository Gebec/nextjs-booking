import { useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { IndexHead, InstantBookablePicker, PricePicker, Tile, VehicleTypePicker } from '../src/components'
import { Container } from '../src/components/_LayoutComponents'

import { EPricePicker } from '../src/enums/price-picker.enum'
import { EInstantBookable } from '../src/enums/instant-bookable.enum'

import type { ICaravan, IResponseData, TVehicleType } from './api/interfaces'
import type { IInstantBookable } from '../src/components/InstantBookablePicker'
import type { SingleValue } from 'react-select'

const Home = ({ data }: { data: IResponseData }) => {
  const [instantBookable, setInstantBookable] = useState(EInstantBookable.ALL)
  const [selectedTypes, setSelectedTypes] = useState<TVehicleType[]>([])
  const [minPrice, setMinPrice] = useState(EPricePicker.MIN_VALUE)
  const [maxPrice, setMaxPrice] = useState(EPricePicker.MAX_VALUE)

  const instantBookableChanged = (selected: SingleValue<IInstantBookable>): void => {
    if (selected) {
      setInstantBookable(selected.value)
    }
  }

  const toggleVehicleType = (name: TVehicleType): boolean => {
    const index = selectedTypes.indexOf(name)

    setSelectedTypes((types: TVehicleType[]) => {
      index === -1 ? types.push(name) : types.splice(index)
      return types
    })

    return index === -1
  }

  const changeMinPrice = (value: number) => {
    if (value <= EPricePicker.MIN_VALUE) {
      setMinPrice(EPricePicker.MIN_VALUE)
      return
    }
    if (value >= maxPrice) {
      setMinPrice(maxPrice)
      return
    }

    setMinPrice(value)
  }

  const changeMaxPrice = (value: number) => {
    if (value <= minPrice) {
      setMaxPrice(minPrice)
      return
    }
    if (value >= EPricePicker.MAX_VALUE) {
      setMaxPrice(EPricePicker.MAX_VALUE)
      return
    }

    setMaxPrice(value)
  }

  return (
    <>
      <IndexHead></IndexHead>
      <ContentWrapper>
        <Container>
          <Filters>
            <PricePicker minPrice={minPrice} maxPrice={maxPrice} changeMinHandler={changeMinPrice} changeMaxHandler={changeMaxPrice} />
            <VehicleTypePicker toggleVehicleType={toggleVehicleType} />
            <InstantBookablePicker onChange={instantBookableChanged} />
          </Filters>
        </Container>
        <Container>
          <ResultsWrapper>
            {data.items.map((item: ICaravan) => {
              const key: string = item.pictures[0] || `${item.name}-${item.location}-${item.price}`
              return <Tile key={key} data={item}></Tile>
            })}
          </ResultsWrapper>
        </Container>
        <button>Načíst další</button>
      </ContentWrapper>
    </>
  )
}
export async function getStaticProps(): Promise<{ props: { data: IResponseData } }> {
  const res = await fetch('http://localhost:3000/api/data')
  const data: IResponseData = await res.json()
  data.items = data.items.slice(0, 6)

  return {
    props: {
      data
    }
  }
}

const ContentWrapper = styled.div`
  & > * {
    border-top: 1px solid var(--c-beige);
  }
`
/*
  For more info about the grid styles: https://css-tricks.com/an-auto-filling-css-grid-with-max-columns/
*/
const ResultsWrapper = styled.section`
  --grid-layout-gap: var(--spacing-32);
  --grid-column-count: 3;
  --grid-item--min-width: 200px;

  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr));
  grid-gap: var(--grid-layout-gap);

  padding-top: var(--spacing-24);
  padding-bottom: var(--spacing-24);
`

const Filters = styled.section`
  display: flex;

  margin-left: calc(-1 * var(--spacing-16));
  margin-right: calc(-1 * var(--spacing-16));

  & > * {
    padding: var(--spacing-24) var(--spacing-16);
  }

  & > * + * {
    border-left: 1px solid var(--c-beige);
  }
`

export default Home
