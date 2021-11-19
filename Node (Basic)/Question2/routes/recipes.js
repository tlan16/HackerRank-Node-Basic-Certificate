/**
 * @type {{id: number, name: string, steps: string[], timers: number[]}[]}
 */
const recipes = require('../recipes.json');
const router = require('express').Router();

router.get('/:id', (req, res) => {
  const { context } = req;
  const id = parseInt(req.params.id)
  if (!recipes.some(r => r.id === id)) {
    res.status(400)
    return res.send('NOT_FOUND')
  }
  const elapsedTime = parseInt(req.query.elapsedTime)
  if (!elapsedTime) {
    res.status(200)
    return res.json({ index: 0 })
  }
  const recipe = recipes.find(r => r.id === id)
  const timers = recipe.timers
  let now = 0
  for (const [step, timer] of timers.entries()) {
    now += timer
    if (now > elapsedTime) {
      return res.json({ index: step })
    }
  }
  return res.json({ index: timers.length - 1 })
});

module.exports = router;

