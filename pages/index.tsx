import { useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { InstantBookablePicker, PricePicker, Tile, VehicleTypePicker } from '../src/components'

import { Container } from '../src/components/_LayoutComponents'

import type { ICaravan, IResponseData } from './api/interfaces'
import type { IInstantBookable } from '../src/components/InstantBookablePicker'
import type { SingleValue } from 'react-select'

const Home = ({ data }: { data: IResponseData }) => {
  const [instantBookable, setInstantBookable] = useState(false)

  const instantBookableChanged = (selected: SingleValue<IInstantBookable>): void => {
    if (selected) {
      setInstantBookable(selected.value)
    }
  }

  return (
    <>
      <Head>
        <title>Karavany</title>
      </Head>
      <ContentWrapper>
        <Container>
          <Filters>
            <PricePicker />
            <VehicleTypePicker />
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
  height: 200px;

  margin-left: -var(--spacing-16);
  margin-right: -var(--spacing-16);

  & > * {
    width: 200px;
  }

  & > * + * {
    border-left: 1px solid var(--c-beige);
  }
`

export default Home
