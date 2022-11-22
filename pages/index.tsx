import { useEffect } from 'react'
import styled from 'styled-components'

import { IndexHead, InstantBookablePicker, PricePicker, Tile, VehicleTypePicker, useCaravansContext } from '../src/components'
import { Container } from '../src/components/_LayoutComponents'
import { getCaravansData } from '../src/utils/caravans-service'

import { EPricePicker } from '../src/enums/price-picker.enum'
import { EInstantBookable } from '../src/enums/instant-bookable.enum'

import type { ICaravan } from './api/interfaces'
import type { ICaravansData } from '../src/utils/caravans-service'

const Home = ({ data: propsData, hasNextPage }: ICaravansData) => {
  const { caravans, setCaravans, setPage, isMoreResults, setMoreResults, isDataLoading, isPageLoading, isError } = useCaravansContext()

  useEffect(() => {
    setCaravans(propsData.items)
    setMoreResults(hasNextPage)
  }, [propsData, hasNextPage, setCaravans, setMoreResults])

  const handleNextPage = async () => {
    setPage((page: number) => ++page)
  }

  return (
    <>
      <IndexHead></IndexHead>
      <ContentWrapper>
        <Container>
          <Filters>
            <PricePicker />
            <VehicleTypePicker />
            <InstantBookablePicker />
          </Filters>
        </Container>
        <Container>
          {isDataLoading ? (
            <Centered>Loading data...</Centered>
          ) : (
            <ResultsWrapper>
              {caravans.map((item: ICaravan) => {
                const key: string = item.pictures[0] || `${item.name}-${item.location}-${item.price}`
                return <Tile key={key} data={item}></Tile>
              })}
            </ResultsWrapper>
          )}
          {isError ? <Centered>Během načítání dat došlo k chybě</Centered> : null}
          {isPageLoading ? (
            <Centered>Loading data</Centered>
          ) : isMoreResults ? (
            <ButtonWrapper>
              <Button onClick={handleNextPage}>Načíst další</Button>
            </ButtonWrapper>
          ) : null}
        </Container>
      </ContentWrapper>
    </>
  )
}
export async function getStaticProps(): Promise<{ props: ICaravansData }> {
  try {
    const { data, hasNextPage }: ICaravansData = await getCaravansData({
      page: 1,
      instantBookable: EInstantBookable.ALL,
      types: [],
      minPrice: EPricePicker.MIN_VALUE,
      maxPrice: EPricePicker.MAX_VALUE
    })
    return {
      props: {
        data,
        hasNextPage
      }
    }
  } catch (error) {
    return {
      props: {
        data: {
          items: [],
          count: 0
        },
        hasNextPage: false
      }
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

const Centered = styled.div`
  text-align: center;
  font-size: var(--fs-24);
  font-weight: var(--fw-bold);
  padding: var(--spacing-32);
`

const ButtonWrapper = styled.div`
  padding: var(--spacing-24) 0;
  text-align: center;
`

const Button = styled.button`
  background-color: var(--c-green);
  color: var(--c-white);
  font-weight: var(--fw-bold);

  padding: var(--spacing-12) var(--spacing-32);

  border-radius: var(--spacing-8);
  border: none;
  outline: none;
`
export default Home
