const Contact = require('../controllers/contacts')
const { Router } = require('express')
const router = Router()

router.get("/contacts", Contact.GET)
router.post('/contacts/search', Contact.SELECT)
router.delete("/contacts", Contact.DELETE)
router.post("/contacts", Contact.POST)
router.put("/contacts", Contact.UPDATE)



module.exports = router