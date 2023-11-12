import express from 'express'
import mysql from 'mysql'

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "test"
})

app.use(express.json())

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
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been created successfully.")
    })
})

app.listen(8800, () => {
    console.log('Connected to backend1!');
})