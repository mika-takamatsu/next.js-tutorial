import Head from 'next/head'
import Layout from "../components/layout"
import React, { useState } from 'react'
import { Button } from '@mui/material'

const Count = () => {

  const [count, setCount] = useState(0)

  const onIncrement = () => {
    setCount(count + 1)
  }

  const onDecrement = () => {
    setCount(count - 1)
  }

  const onInitial = () => {
    setCount(0)
  }

  return (
    <Layout>
      <Head>
        <title>Count</title>
      </Head>
      <div>
        <h1>Count:{count}</h1>
        <Button onClick={onIncrement}>+</Button>
        <Button onClick={onDecrement}>-</Button>
        <Button onClick={onInitial}>初期化</Button>
      </div>
    </Layout>
  )
}

export default Count