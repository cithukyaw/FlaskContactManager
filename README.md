# FlaskContactManager

A simple full stack application using Python + JavaScript.

- [Backend](backend/) - Python with Flask and SQLite for the backend
- [Frontend](frontend/) - JavaScript with React for the frontend

Reference: https://www.youtube.com/watch?v=PppslXOR7TA


## Run Backend

    cd backend

    # create virtual environment (windows)
    py -3 -m venv .venv

    # activate the environment (windows)
    .venv\Scripts\activate

    # install dependencies
    pip install -r requirements.txt

    # run app
    flask --app main run

## Run Fronend

    cd frontend

    # install dependencies
    npm install

    # run app
    npm run dev
