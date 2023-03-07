import inquirer from 'inquirer';

function emptyStringValidationFactory(errorMsg) {
  return async (input) => {
    if (input.trim().length > 0) {
      return true;
    }
    return errorMsg;
  };
}

const questions = [];

// run your command
inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(JSON.stringify(answers, null, 2));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log('Your console environment is not supported!');
    } else {
      console.log(error);
    }
  });
