import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const navigate = useNavigate()

  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: null,
    cover: '',
  })

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async(e) => {
    try {
      const res = await axios.post('http://localhost:8800/books', book)
      console.log(res);
      if (res.status === 200) {
        navigate('/')
      }
    } catch(err) {
      console.log(err);
    }
  }

  console.log(book);

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input type="text" placeholder='title' onChange={handleChange} name='title' />
      <input type="text" placeholder='desc' onChange={handleChange} name='desc' />
      <input type="numbe r" placeholder='price' onChange={handleChange} name='price' />
      <input type="text" placeholder='cover' onChange={handleChange} name='cover' />
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add


