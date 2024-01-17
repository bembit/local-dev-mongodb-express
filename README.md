### Short Project Description

The two main ideas are to replicate "serverless" locally for testing and understanding, and to see how far can I push the limits of Front-end (or Back-end really ) with only using HTMX.

The `Front-end on port 3000` sends a post request to the `Lambda-replica on port 8001`, validates the post, writes to the `Database on port 8000`, and `sends back some html` to the HTMX Front-end.

**Technologies Used:**

Front-end: HTML, HTMX, JavaScript
Back-end: Node.js, Express.js, MongoDB
Additional Libraries: Mongoose (for MongoDB), Axios (for HTTP requests), CORS (for CORS of course ^_^), dotenv (to change port numbers easily), uuidv4 (to generate some additional unique keys for testing), nodemon (for auto-restart server on changes).  

### Getting Started

1. Clone the repository.
2. Install dependencies using npm install in both `db` and `lambda-replica-server` folders.
2. Optional - Docker - Work In Progress
3. Install MongoDB locally. I used 7.0.4 on Windows with Compass.
4. Start the MongoDB Server. **Default port is 8000. You can change it in the .env file.**
```bash
cd db
node app.js
# or use the nodemon scripts with
npm run dev
```
5. Start the Lambda Replica Server. **Default port is 8001. You can change it in the .env file.**
```bash
cd lambda-replica-server
node app.js
# or use the nodemon scripts with
npm run dev
```
  - Optionally, seed the database with dummy data with `node seed.js` in the `db` folder.
  - Optionally, delete the database with `node seedDelete.js` in the `db` folder.

6. Install the http-server module `npm install -g http-server` and start it on port 3000.
**Default port is 3000. You can change it in the .env file.**
```bash
http-server -p 3000
```
Or use whatever you like, I configured CORS to allow communication between these three ports. 3000, 8000, 8001 by default.
**You can change these in the .env file.**

7. You should be able to see the HTMX form on localhost:3000 and use the replica function to post to the database and see the results.
