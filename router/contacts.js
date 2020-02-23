const bodyParser = require('body-parser');
const router = require('express').Router();
const contacts = require('../model/contacts');

router.get('/contacts', (req, res) => {
    res.status(200).send(contacts.getAll(req.token))
});

router.get('/contact/:id', (req, res) => {
    res.status(200).send(contacts.get(req.token, req.params.id))
});

router.delete('/contact/:id', (req, res) => {
    res.status(200).send(contacts.remove(req.token, req.params.id))
});
  
router.post('/contact', bodyParser.json(), (req, res) => {
    const { name, handle } = req.body;

    if (name && handle) {
        res.status(200).send(contacts.add(req.token, req.body))
    } 
    else {
        res.status(403).send({
            error: 'Please provide both a name and a handle'
        })
    }
})

router.put('/contact/:id', bodyParser.json(), (req, res) => {
    if (req.params.id) {
        res.status(200).send(contacts.update(req.token, req.params.id, req.body))
    } 
    else {
        res.status(403).send({
            error: 'Incorrect id. Please provide correct data'
        })
    }
})

router.post('/contacts/reset', (req, res) => {
    res.status(200).send(contacts.reset(req.token))
})

module.exports = router;