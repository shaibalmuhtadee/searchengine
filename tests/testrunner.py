import unittest
import sys
import os

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../'))
if project_root not in sys.path:
    sys.path.append(project_root)
    
# Create a test suite
loader = unittest.TestLoader()
suite = unittest.TestSuite()

# Add the individual test cases to the suite
suite.addTests(loader.loadTestsFromName('test1'))  # Test case 1
suite.addTests(loader.loadTestsFromName('test2'))  # Test case 2
suite.addTests(loader.loadTestsFromName('test3'))  # Test case 3
suite.addTests(loader.loadTestsFromName('test4'))  # Test case 4

# Run the test suite
if __name__ == "__main__":
    runner = unittest.TextTestRunner()
    runner.run(suite)
