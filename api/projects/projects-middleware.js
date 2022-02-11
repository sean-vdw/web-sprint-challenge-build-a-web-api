// add middlewares here related to projects
const Projects = require('./projects-model');

function logger(req, res, next) {
  console.log(`${new Date().toISOString()} : [${req.method}] at ${req.url}`);
  next();
};

async function validateProjId(req, res, next) {
  const { id } = req.params;
  try {
    const project = await Projects.get(id);
    if (!project) {
      res.status(404).json({ message: "Project not found..."});
    } else {
      req.project_id = project;
      next();
    }
  } catch(err) {
    res.status(500).json({ message: "Error finding the project..."});
  }
};

async function validateProject(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ message: "Please enter both a project name and description..." });
  } else {
    req.name = name;
    req.description = description;
    next();
  }
};


module.exports = {
  logger,
  validateProjId,
  validateProject,
}