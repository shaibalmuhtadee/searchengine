# Searchington

![image](https://github.com/user-attachments/assets/a2e9be03-0e90-4245-8893-d602b47b6360)

## Front-End

Make sure you have Python installed. Create a virtual environment and install the dependencies.
Run the following commands and then navigate to `http://localhost:8080/`

```sh
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python app.py
```

## Back-End

Make sure you have Python installed. Create a virtual environment and install the dependencies.
Run the following commands and you can observe the output in the terminal or in `out.txt`.

```sh
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python backend/crawler.py
```

## Back-End Testing Commands

### Test Files:

Provided in the `/tests` directory are 4 unit test files in python that compare a running output of `crawler.py` with output files labeled as `output_test#.txt` **_where # represents the test number_**

The unit test files contain the following URL's:

Test #1: https://en.wikipedia.org/wiki/Web_crawler - Testing a generic static website.
Test #2: https://en.wikipedia.org/wiki/Python_(programming_language) - Testing another static website.  
Test #3: https://localhost:8080 (Provided you are actively running the frontend server using `python app.py`) - Testing an empty website.  
Test #4: https://example.com/nonexistent and https://example.com - Testing an invalid website (404 Not Found Error).

### Running the tester:

You can run any of these individually using `python -m unittest tests\test#.py` **_where # represents the test number you desire to run_**.  
Alternatively, you can run `python tests\testrunner.py` to run all 4 tests simultaneously.
