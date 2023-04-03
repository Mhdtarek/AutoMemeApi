# AI Meme Api

This is a simple web application that generates AI-powered memes using[ puppeteer](https://github.com/puppeteer/puppeteer) and [ImageFlip](https://imgflip.com/ai-meme). It allows users to make GET requests to the `/getAiMeme` endpoint to receive a randomly generated meme image.

## Installation

To install the necessary dependencies, run:
Copy code

    npm install

## Usage

To start the server, run:

    npm start

By default, the server will be listening on port 3000. You can change the port by setting the `PORT` environment variable.

## Endpoint

### `/getAiMeme`

Method: `GET`
Response: The response will be a randomly generated meme image in PNG format.

## Statistics

The application tracks the number of requests and the average response time. When the server is shut down using `CTRL-C` or `SIGINT`, the statistics will be saved to `stats.json` in the root directory.
