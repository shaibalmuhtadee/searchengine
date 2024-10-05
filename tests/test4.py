import unittest
from backend.crawler import crawler

class TestCrawlerOutputCase3(unittest.TestCase):
    def setUp(self):
        self.crawler = crawler(None, "urls.txt")
        
        self.crawler._url_queue = [
            ("https://example.com/nonexistent", 0),  # A URL that does not exist
            ("https://example.com", 0)                # A valid URL for comparison
        ]

    def test_crawl_output(self):
        # Run the crawler
        self.crawler.crawl(depth=0)

        # Get the outputs from the crawler
        document_index = self.crawler.get_document_index()
        lexicon = self.crawler.get_lexicon()
        inverted_index = self.crawler.get_inverted_index()
        resolved_inverted_index = self.crawler.get_resolved_inverted_index()

        # Create the output string for comparison
        actual_output = (
            f"Document Index [Size = {len(document_index)}]:\n{document_index}\n\n"
            f"Lexicon [Size = {len(lexicon)}]:\n{lexicon}\n\n"
            f"Inverted Index [Size = {len(inverted_index)}]:\n{inverted_index}\n\n"
            f"Resolved Inverted Index [Size = {len(resolved_inverted_index)}]:\n{resolved_inverted_index}\n"
        )

        # Read expected output from the file
        with open("tests/output_test4.txt", "r") as f:
            expected_output = f.read()

        # Compare actual output to expected output
        self.assertEqual(actual_output, expected_output, "Crawler output does not match expected output for Test Case 4.")

if __name__ == "__main__":
    unittest.main()
