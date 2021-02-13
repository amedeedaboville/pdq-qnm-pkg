.PHONY:clean build  doc

MKDIR_P = mkdir -p
DIST_DIR=dist
PDQ_DIR=../../lib
SOURCES=$(PDQ_DIR)/*.c
EXPORTED_FUNCTIONS = $(shell ./compute_exported_functions.sh)
CC=emcc
CFLAGS=-s TOTAL_MEMORY=150mb -s TOTAL_STACK=8mb \
    -s ASSERTIONS=2 -s MODULARIZE=1 \
    -s EXPORTED_FUNCTIONS=$(EXPORTED_FUNCTIONS)  \
    -s 'EXTRA_EXPORTED_RUNTIME_METHODS=["ccall", "cwrap"]' \
	-O2 --post-js post.js
WEB_TARGET=$(DIST_DIR)/pdq.mjs
NODE_TARGET=$(DIST_DIR)/pdq.js
TYPES_TARGET=$(DIST_DIR)/pdq.d.ts
DOC_TARGET=out/

all: build

$(DIST_DIR):
	${MKDIR_P} $(DIST_DIR)

$(NODE_TARGET): $(SOURCES) | $(DIST_DIR)
	$(CC) $^ $(CFLAGS) -o $@ -s ENVIRONMENT="node,shell"

$(WEB_TARGET): $(SOURCES) | $(DIST_DIR)
	$(CC) $^ $(CFLAGS) -o $@ -s "EXPORT_ES6=1" -s ENVIRONMENT="web,worker"

$(DOC_TARGET):
	npm run doc

$(TYPES_TARGET):
	npm run types

doc: $(DOC_TARGET)

types: $(TYPES_TARGET)

build: $(NODE_TARGET) $(WEB_TARGET) doc types

clean:
	$(RM)  -rf dist/
	$(RM)  -rf out/