import inquirer from 'inquirer';

function validationFactory(checker, errorMsg) {
  return async (input) => (checker(input) ? true : errorMsg);
}

function emptyStringChecker(input) {
  return input.trim().length > 0;
}

function validEmailChecker(input) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

const questions = [
  {
    type: 'input',
    name: 'firstName',
    message: "What's your first name?",
    validate: validationFactory(emptyStringChecker, 'Name cannot be empty'),
    filter: async (input) => input.trim().toLowerCase().charAt(0).toUpperCase() + input.slice(1),
  },
  {
    type: 'input',
    name: 'emailAddress',
    message: (answers) => `Hello, ${answers.firstName}! What's your email address?`,
    validate: validationFactory(validEmailChecker, 'Email has to be a valid email address'),
  },
  {
    type: 'list',
    name: 'isExperienced',
    message: 'Are you an experienced developer?',
    choices: ['yes', 'no'],
  },
  {
    type: 'list',
    name: 'yearsOfExperience',
    message: 'How many years of experience you have with JavaScript?',
    choices: ['0-1', '1-3', '3-5', '5-10', '10+'],
    when: (answers) => (answers.isExperienced === 'yes' ? true : false),
  },
  {
    type: 'checkbox',
    name: 'jsLibraries',
    message: 'How many javascript library do you know?',
    choices: ['React.js', 'Vue', 'Angular', 'Node.js', 'jQuery', 'D3.js'],
    when: (answers) => (answers.isExperienced === 'yes' ? true : false),
    validate: async (input) => (input.length > 0 ? true : 'You have to choose at least one library'),
  },
  {
    type: 'number',
    name: 'expectedSalary',
    message: 'What is your desired salary?',
    when: (answers) => (answers.isExperienced === 'yes' ? true : false),
    validate: async (input) => (input > 0 ? true : 'Salary cannot be 0'),
  },
];

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
