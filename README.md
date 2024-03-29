<div id="top"></div>
<h3 align="center">Bloglist</h3>

  <p align="center">
    A Nodejs application that allows the registered users to create lists of blogs (name, author and URL)
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a demo Nodejs application that allows authenticated users to create a list of blogs (name, author and URL), like blog entries created by any user and delete their own entries. 

Authentication of users implemented using Bcrypt hash function and JSON web token (jwt). Express.js was used for the request handling and Mongoose ODM for the data modeling. The front end was built with React.js and Redux separately from the back end and imported in the code under the 'build' directory. Finally, the application was containerized and with Docker-compose it was packaged with a Mongodb and a Mongo-express container.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Docker](https://www.docker.com/)
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [Mongoose](https://mongoosejs.com/)
* [Mongodb](https://hub.docker.com/_/mongo)
* [Mongo-Express](https://hub.docker.com/_/mongo-express)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

To run the application locally you only need docker and docker-compose installed.

### Installation

To run the application locally, after you clone this repo, run the following command from the root of the project:
  ```sh
  docker-compose up
  ```

When all three containers are up and running, you can access the application in port [3003](localhost:3003) of your localhost.
Mongo-express can be accessed in port [8081](localhost:8081) of your localhost.

To stop and discard all three containers, run this command from the root of the project:
  ```sh
  docker-compose down
  ```

<p align="right">(<a href="#top">back to top</a>)</p>
