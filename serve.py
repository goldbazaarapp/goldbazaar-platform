import http.server
import os

# Always serve from the directory this script lives in
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, fmt, *args):
        # Suppress request logs for cleaner output
        pass

print("GoldBazaar server running at http://localhost:8080")
print("Press Ctrl+C to stop.")
http.server.test(HandlerClass=NoCacheHandler, port=8080, bind='127.0.0.1')
