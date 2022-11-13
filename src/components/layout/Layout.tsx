import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import Footer from './Footer'

import { EBreakpoint } from '../../../styles/breakpoint.enum'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <header>
        <Container>
          <Header></Header>
        </Container>
      </header>
      <Content>
        <Container>{children}</Container>
      </Content>

      {/* Footer left intentionally without padding as the footer is missing in the design */}
      <footer>
        <Container>
          <Footer></Footer>
        </Container>
      </footer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    padding: var(--spacing-16);
  }

  @media (min-width: ${EBreakpoint.MOBILE}) {
    & > * {
      margin-left: 6vw;
      margin-right: 6vw;
    }
  }
`

const Container = styled.div`
  max-width: var(--content-max-width);
  margin: auto;
`

const Content = styled.main`
  flex-grow: 1;
`
