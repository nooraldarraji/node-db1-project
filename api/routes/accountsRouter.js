const express = require('express')
const router = express.Router()

const db = require("../../data/dbConfig");


router.get("/", (req, res) => {

    db.select('*').from('accounts')
        .then(accounts => {
            res.status(200).json({ data: accounts })
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.post("/", postValidation, (req, res) => {
    // const
    db('accounts').insert(req.body)
        .then(accounts => {
            res.status(200).json({ data: accounts })
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.put("/:id", postValidation, (req, res) => {
    const id = req.params.id

    db('accounts')
        .where({ id })
        .update(req.body)
        .then(accounts => {
            res.status(200).json({ data: accounts })
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.delete("/:id", postValidation, (req, res) => {
    const id = req.params.id

    db('accounts')
        .where({ id })
        .delete()
        .then(accounts => {
            res.status(200).json({ data: accounts })
        })
        .catch(error => {
            res.status(500).json(error)
        })
});


function postValidation(req, res, next) {
    if (!req.body.name || !req.body.budget) {
        res.status(422).json('This code missing eaither "name" or "budget" feilds')
    } else {
        next()
    }
}

module.exports = router