const Actions = require('./actions-model');

function logger(req, res, next) {
  console.log(`${new Date().toISOString()} : [${req.method}] at ${req.url}`);
  next();
};

async function validateActionId(req, res, next) {
  const { id } = req.params;
  try {
    const action = await Actions.get(id);
    if (!action) {
      res.status(404).json({ message: "Could not find the action..." });
    } else {
      req.project_id = action;
      next();
    }
  } catch(err) {
    res.status(500).json({ message: "Error finding the action..." });
  }
};
function validateAction(req, res, next) {
  const { notes, description } = req.body;
  if (!notes || !description) {
    res.status(400).json({ message: "Please provide valid action notes and description..." });
  } else {
    req.notes = notes;
    req.description = description;
    next();
  }
};

module.exports = {
  logger,
  validateActionId,
  validateAction
}
