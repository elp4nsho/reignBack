const Router = require('express');
const service = require("../../services/newsService");

const router = Router();

router.get('/all', (req, res) => {
    service.getAll().then(d=>{
        res.json(d);
    });
});
router.delete('/delete/:id', (req, res) => {
    service.delete(req.params.id).then(d=>{
        res.json(d);
    });
});


module.exports = router;
