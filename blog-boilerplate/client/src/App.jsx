import { useState } from 'react'
import './App.css'
import PostForm from './components/PostForm'
import PostList from './components/PostList'

function App() {

  return (
    <>
      <PostForm/>
      <PostList/>
    </>
  )
}

export default App
