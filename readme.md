
# KnotzGPTPlus2

KnotzGPTPlus2 is a full-stack Node.js application that uses OpenAI's GPT-4 API to create a chatbot. It includes a frontend interface for user interactions and a backend server that handles API calls to OpenAI's GPT-4.

## Project Overview

The frontend (`main.js`) includes a chat interface where users can send messages and view responses from the chatbot. It communicates with the backend via API calls, sending user messages and receiving chatbot responses.

The backend (`index.js`) is an express server that receives API calls from the frontend and makes corresponding calls to OpenAI's GPT-4. It includes two routes: one for receiving chat messages from the frontend and sending them to OpenAI's GPT-4, and another for updating the system prompt used in the chatbot's responses.

## Installation

1. Clone this repository to your local machine:

    ```sh
    git clone <repository url>
    ```

2. Install the necessary dependencies:

    ```sh
    cd KnotzGPTPlus2
    npm install
    ```

3. Create a `.env` file in the root directory of the project and add your OpenAI API key:

    ```sh
    OPENAI_API_KEY=<your api key here>
    ```

## Usage

To start the application, run the following command:

```sh
npm start
```

The application will be available at `http://localhost:4009`.

## Troubleshooting

1. **Problem**: Application doesn't start or throws an error related to dependencies.
   **Solution**: Ensure that you have the latest version of Node.js and npm installed. If the problem persists, try deleting the `node_modules` folder and `package-lock.json` file, then run `npm install` again.

2. **Problem**: Application throws an error related to OpenAI API calls.
   **Solution**: Check that you have set up the `.env` file correctly with your OpenAI API key. Make sure that the key is correct and hasn't expired.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
