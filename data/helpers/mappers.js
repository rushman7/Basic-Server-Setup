module.exports = {
  intToBoolean,
  booleanToint,
  projectToBody,
  userToBody
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

function projectToBody(project) {
  const result = {
    ...project,
    completed: intToBoolean(project.completed),
  };

  if (project.tasks) {
    result.tasks = project.tasks.map(task => ({
      ...task,
      completed: intToBoolean(task.completed),
    }));
  }

  return result;
}

function userToBody(user) {
  if (user.projects) {
    user.projects = user.projects.map(project => ({
      ...project,
      completed: intToBoolean(project.completed),
    }));
  }

  return user;
}
