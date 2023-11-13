import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const Update = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: null,
    cover: '',
  })

  const bookId = location.pathname.split('/')[2]

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleUpdate = async(e) => {
    try {
      const res = await axios.put(`http://localhost:8800/books/${bookId}`, book)
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
      <h1>Update New Book</h1>
      <input type="text" placeholder='title' onChange={handleChange} name='title' />
      <input type="text" placeholder='desc' onChange={handleChange} name='desc' />
      <input type="numbe r" placeholder='price' onChange={handleChange} name='price' />
      <input type="text" placeholder='cover' onChange={handleChange} name='cover' />
      <button onClick={handleUpdate}>Update</button>
    </div>
  )
}

export default Update


