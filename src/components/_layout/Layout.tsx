import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import Footer from './Footer'

import { Container } from '../_LayoutComponents'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <Container>
          <Header></Header>
        </Container>
      </HeaderWrapper>
      <Content>{children}</Content>

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
  margin-left: calc(100vw - 100%);
  margin-right: 0;

  display: flex;
  flex-direction: column;
`

const HeaderWrapper = styled.header`
  padding-top: var(--spacing-24);
  padding-bottom: var(--spacing-24);
`

const Content = styled.main`
  flex-grow: 1;
`
