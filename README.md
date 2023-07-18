# Handwritten digit recognition

Front end written in Next.js
Back end written in Python

To try the project out, clone the repo onto your local device, navigate to the project directory, and run the following commands. You will only need to run the environment setup commands once, but will need to run the commands to run the front-end and back-end every time you want to run the whole project.

### Front-end environment setup:
```
npm install
npm run build
```

### Run front-end:
```
npm run start
```
You can navigate to the front-end interface by going to the URL listed by the terminal. Usually, the URL is "localhost:3000"

### Back-end environment setup:
Note: You may need another terminal tab to do this if you are already running the front-end without using screen.
```
pip -m venv /path/to/project/venv
# Example path: ~/Documents/handwritten-digit-recognition/venv
source ./venv/bin/activate
pip install -r requirements.txt
```

### Run back-end:
```
source ./venv/bin/activate
python server.py
```
You should now be able to run the app!