import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "test"
})

app.use(express.json())
app.use(cors())


// ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY '123456';

app.get("/", (req, res) => {
    res.json('hello, this is the backend')
})

// 获取书籍信息
app.get("/books", (req, res) => {
    const q = 'SELECT * FROM books'
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// 新增书籍
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been created successfully.")
    })
})

// 删除书籍
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id
    const q = 'DELETE FROM books WHERE id = ?'

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been deleted successfully.")
    })
})

// 更新书籍
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id
    const q = 'UPDATE books SET `title` = ?, `desc`= ?, `price` = ?, `cover` = ? WHERE id = ?'
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ]

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been updated successfully.")
    })
})

app.listen(8800, () => {
    console.log('Connected to backend1!');
})