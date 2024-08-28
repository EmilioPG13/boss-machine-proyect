# Boss Machine

## Project Overview

In this project, I created an entire API to serve information to my Boss Machine, a unique management application for today's most accomplished (evil) entrepreneurs. I created routes to manage my 'minions', my brilliant 'million dollar ideas', and to handle all the annoying meetings that kept getting added to my busy schedule.

You can view a video demonstration of the final app here:

<video width="100%" height="100%" controls>
<source src="https://s3.amazonaws.com/codecademy-content/programs/build-apis/solution-videos/BossMachine480.mov" type="video/mp4">
The markdown processor does not support the video tag.
</video>

## Getting Started

You'll need to run some terminal commands to get the application started. First, open the root project directory in your terminal. Run `npm install` to install the dependencies of this project and build the front-end application. Once it has finished installing, you can run `npm run start` to begin your server. You'll see `Server listening on port 4001` in the terminal. The `npm run start` script will automatically restart your server whenever you make changes to the **server.js** file or **server/** folder. If you want to turn this off, simply start your server with the `node server.js` command. You can kill either process with the `Ctrl + C` command.

To see the application in its initial, non-working state, simply open **index.html** in a web browser. You should use [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html) (at least version 60) or [Firefox](https://www.mozilla.org/en-US/firefox/new/) (at least version 55). The links above will let you download the latest release of either browser if you do not have it or are unsure of which version you're running.

### API Routes

The API routes have been implemented within the **server** folder. The file and router structure was organized according to best practices, ensuring that all API endpoints function as intended. The testing suite has verified the correct operation of these routes.

The project's 'database' is located in **server/db.js**. This database is automatically seeded each time the server restarts, providing a consistent starting point for development and testing. Detailed information about working with the database and utilizing its exported helper functions can be found in the project documentation.

### Routes Used

- `/api/minions`
    - GET /api/minions to get an array of all minions.
    - POST /api/minions to create a new minion and save it to the database.
    - GET /api/minions/:minionId to get a single minion by id.
    - PUT /api/minions/:minionId to update a single minion by id.
    - DELETE /api/minions/:minionId to delete a single minion by id.
- `/api/ideas`
    - GET /api/ideas to get an array of all ideas.
    - POST /api/ideas to create a new idea and save it to the database.
    - GET /api/ideas/:ideaId to get a single idea by id.
    - PUT /api/ideas/:ideaId to update a single idea by id.
    - DELETE /api/ideas/:ideaId to delete a single idea by id.
- `/api/meetings`
    - GET /api/meetings to get an array of all meetings.
    - POST /api/meetings to create a new meeting and save it to the database.
    - DELETE /api/meetings to delete *all* meetings from the database.

For all `/api/minions` and `/api/ideas routes`, any POST or PUT requests will send their new/updated resources in the request body. POST request bodies will not have an `id` property, you will have to set it based on the next id in sequence.

For `/api/meetings` POST route, no request body is necessary, as meetings are generated automatically by the server upon request. Use the provided `createMeeting` function exported from **db.js** to create a new meeting object.

### Working with the 'Database'

In my implementation of the Boss Machine API, I utilized several helper functions exported from the **server/db.js** file to interact with the database arrays. These functions allowed me to focus on building Express routes without worrying about the underlying database operations. Each function takes at least one argument, with the first always being a string representing the database model name (`'minions'`, `'ideas'`, `'meetings'`, or `'work'`).

Here's a brief overview of the key functions I used:

- `getAllFromDatabase`: I used this to retrieve all elements from a specific model. It returns an array or `null` for invalid arguments.
- `getFromDatabaseById`: This function helped me fetch a single instance by its ID. It returns the instance or `null` for invalid inputs.
- `addToDatabase`: I utilized this to create new instances in the database. It handles ID assignment and schema validation, returning the newly created instance.
- `updateInstanceInDatabase`: This function allowed me to update existing instances. It requires a valid ID and performs schema validation, returning the updated instance or `null` for invalid inputs.
- `deleteFromDatabasebyId`: I used this to remove specific elements from the database. It returns `true` on successful deletion and `false` if the element isn't found.
- `deleteAllFromDatabase`: This function was particularly useful for the /api/meetings route, allowing me to clear all elements from a specific model.

By leveraging these functions, I was able to efficiently manage the database operations within my Express routes, ensuring proper data handling and manipulation throughout the API.

### Schemas

- Minion:
    - id: string
    - name: string
    - title: string
    - salary: number
- Idea
    - id: string
    - name: string
    - description: string
    - numWeeks: number
    - weeklyRevenue: number
- Meeting
    - time: string
    - date: JS `Date` object
    - day: string
    - note: string

Take note that many values that could be numbers are in fact strings. Since we are writing an API, we can't trust that data is always provided by a client. 

### Custom Middleware

- I created a custom middleware function called `checkMillionDollarIdea` to enhance the functionality of certain /api/ideas routes. This function, which I implemented in the **server/checkMillionDollarIdea.js** file, serves as a validator to ensure that all new or updated ideas maintain a minimum value of one million dollars. It calculates the total value of an idea by multiplying its `numWeeks` and `weeklyRevenue` properties, thus safeguarding the high-value nature of the ideas in our database.

## Testing

A testing suite has been provided for you, checking for all essential functionality and
edge cases.

To run these tests, first open the root project directory in your terminal. Then run `npm install` to install all necessary testing dependencies (you will only need to do this step once).

Finally, run `npm run test`. You will see a list of tests that ran with information
about whether or not each test passed. After this list, you will see more specific output
about why each failing test failed. While they are open in a terminal window, these tests will re-run every time you save server files. If you want to quit the testing loop, use `Ctrl + C`. If you only want to run the tests once, you can run the `mocha` command in the terminal from your project root directory.
