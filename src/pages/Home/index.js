import React from 'react'
import styled from 'styled-components'
import DummyImage from './dummy.png'


const StyledImage = styled.img`
  width: 100%;
  max-width: 128rem;
`

const HomePage = () => (
  <section>
    <h2>React Redux Apollo GraphQL Hot Boilerplate 2.0</h2>
    <p>
      This yet another react boilerplate. I created first version 9 months ago because there were
      not enough examples of react, redux and apollo graphql. I made a lot of major updates. I hope
      I can save you some time setting up <i>the prefect</i> react boilerplate.
    </p>

    <h3>Major Updates</h3>
    <h4>Dependencies:</h4>
    <ul>
      <li>functional programming with Recompose 0.26.0</li>
      <li>Apollo 2.0.2</li>
      <li>React 16.1.0</li>
      <li>Webpack 3.8.1</li>
    </ul>

    <h4>Scripts:</h4>
    <ul>
      <li><i>prod</i> runs on express and is heroku ready</li>
      <li><i>dev</i> also runs on express and is heroku ready</li>
    </ul>
    <StyledImage src={DummyImage} alt="dummy" />
  </section>
)

export default HomePage
