// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');

const { logger, validateActionId, validateAction } = require('./actions-middlware');

const router = express.Router();

// Endpoints

router.get('/', logger, (req, res, next) => {
  Actions.get()
    .then(actions => {
      res.json(actions);
    })
    .catch(next);
});

router.get('/:id', logger, validateActionId, (req, res, next) => {
  Actions.get(req.params.id)
    .then(action => {
      res.json(action);
    })
    .catch(next);
});

router.post('/', logger, validateActionId, validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then(newAction => {
      res.json(newAction);
    })
    .catch(next);
});

router.put('/:id', logger, validateActionId, validateAction, (req, res, next) => {
  Actions.update(req.params.id, req.body)
  .then(updatedAction => {
    if(req.body.completed === null || req.body.completed === undefined) {
      res.status(400).json({ message: "Please include a completion status..." });
    } else {
      res.status(200).json(updatedAction);
    }
  })
  .catch(next);
});

module.exports = router;