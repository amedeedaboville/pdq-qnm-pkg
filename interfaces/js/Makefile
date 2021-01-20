.PHONY:  all dist clean

MKDIR_P = mkdir -p
DIST_DIR=dist
OUT_NAME=pdq.js
PDQ_DIR="../../lib/"
define EXPORTED_FUNCTIONS
['_PDQ_CreateClosed', '_PDQ_CreateClosed_p', '_PDQ_CreateOpen', '_PDQ_CreateOpen_p',
'_PDQ_CreateNode', '_PDQ_CreateMultiNode', '_PDQ_GetStreamsCount', '_PDQ_GetResponse',
'_PDQ_GetResidenceTime', '_PDQ_GetThruput', '_PDQ_GetLoadOpt', '_PDQ_GetUtilization', 
'_PDQ_GetQueueLength', '_PDQ_GetThruMax', '_PDQ_Init', '_PDQ_Report', '_PDQ_SetDebug',
'_PDQ_SetDemand', '_PDQ_SetDemand_p', '_PDQ_SetVisits', '_PDQ_SetVisits_p', '_PDQ_Solve',
'_PDQ_SetWUnit', '_PDQ_SetTUnit', '_PDQ_SetComment', '_PDQ_GetComment'
]
endef
export EXPORTED_FUNCTIONS
SOURCES=$(PDQ_DIR)/*.c
CC=emcc
CFLAGS=-s TOTAL_MEMORY=150mb -s TOTAL_STACK=8mb \
    -s ASSERTIONS=2 -s MODULARIZE=1 \
    -s"EXPORTED_FUNCTIONS=$$EXPORTED_FUNCTIONS" \
    -s 'EXTRA_EXPORTED_RUNTIME_METHODS=["ccall", "cwrap"]' \
	-O2 --post-js post.js

all: build

dist_dir:
	${MKDIR_P} $(DIST_DIR)

node: dist_dir
	$(CC) $(PDQ_DIR)/*.c $(CFLAGS) -o $(DIST_DIR)/pdq.js -s ENVIRONMENT="node,shell"

web: dist_dir
	$(CC) $(PDQ_DIR)/*.c $(CFLAGS) -o $(DIST_DIR)/pdq.mjs -s "EXPORT_ES6=1" -s ENVIRONMENT="web,worker"

build: dist_dir node web

clean:
	$(RM)  -rf dist/
