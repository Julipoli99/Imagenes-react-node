const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, "../images"),
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single("image")

/*router.get("/api", (req, res) => {
    res.json({
        Nombres: ["Julian", "Tomas", "Agustin", "Nicolas"],
        Edades: [22, 17, 24, 27]
    })
})*/

router.post("/images/post", fileUpload, (req, res) => {

    console.log(req.file)

    req.getConnection((error, conn) => {
        if(error) return res.status(500).send("Server error")

        const type = req.file.mimetype;
        const name = req.file.originalname;
        const data = fs.readFileSync(path.join(__dirname, "../images/" + req.file.filename))

        conn.query("INSERT INTO imagen set ?", [{type, name, data}], (error, rows) => {
            if(error) return res.status(500).send("Server error")

            res.send("Imagen guardada!")
        })
    })
})

router.get("/images/get", (req, res) => {

    req.getConnection((error, conn) => {
        if(error) return res.status(500).send("Server error")


        conn.query("SELECT * FROM IMAGEN", (error, rows) => {
            if(error) return res.status(500).send("Server error")

            rows.map(img => {
                fs.writeFileSync(path.join(__dirname, "../dbImages/" + img.id + "-randomImage.png"), img.data)
            })

            const readImage = fs.readdirSync(path.join(__dirname, "../dbImages/"))

            res.json(readImage);

        })
    })
})

router.delete("/images/delete/:id", (req, res) => {

    req.getConnection((error, conn) => {
        if(error) return res.status(500).send("Server error")


        conn.query("DELETE FROM IMAGEN WHERE ID = ?", [req.params.id], (error, rows) => {
            if(error) return res.status(500).send("Server error")

            fs.unlinkSync(path.join(__dirname, "../dbImages/" + req.params.id + "-randomImage.png"))

            res.send("Image deleted");

        })
    })
})

module.exports = router;