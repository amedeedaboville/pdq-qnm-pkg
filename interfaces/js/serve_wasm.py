import BaseHTTPServer, SimpleHTTPServer
SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map['.wasm'] = 'application/wasm'
SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map['.mjs'] = 'application/javascript'
port = 8000
httpd = BaseHTTPServer.HTTPServer(('localhost', 8000), SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.serve_forever()