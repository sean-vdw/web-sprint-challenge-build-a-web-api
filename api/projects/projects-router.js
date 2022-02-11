const express = require('express');
const Projects = require('./projects-model');

const { logger, validateProjId, validateProject } = require('./projects-middleware');
const router = express.Router();

// Pull in middleware

// Endpoints
router.get('/', logger, (req, res, next) => {
  Projects.get()
    .then(project => {
      res.json(project);
    })
    .catch(next);
});

router.get('/:id', logger, validateProjId, (req, res, next) => {
  Projects.get(req.params.id)
    .then(project => {
      res.json(project);
    })
    .catch(next);
});

router.post('/', logger, validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then(newProj => {
      res.status(201).json(newProj);
    })
    .catch(next);
});

router.put('/:id', logger, validateProjId, validateProject, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then(updatedProj => {
      if (req.body.completed === null || req.body.completed === undefined) {
        res.status(400).json({ message: "please enter a completed status..." });
      } else {
        res.status(200).json(updatedProj);
      }
    })
    .catch(next);
});

router.delete('/:id', logger, validateProjId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(delProject => {
      res.json(delProject);
    })
    .catch(next);
});

module.exports = router;