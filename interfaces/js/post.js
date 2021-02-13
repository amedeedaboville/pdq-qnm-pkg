
/**  @example
 * pdq.init("MyModel")
 * // returns 2
 * /

/**
 * Call this to initialize PDQ before creating a model.
 * @param {string} name - The name of the model.
 * @return {string} the C return value
 */
function init(name) {
    return ccall('PDQ_Init', "number", ["string"])(arguments);
}
Module.init = init;

/**
 * Creates an open queuing system with a given arrival rate.
 * @param {string} name - The name of the model.
 * @param {number} lambda - The arrival rate.
 */
function createOpen(name, lambda) {
    return ccall('PDQ_CreateOpen', null, ["string", "number"])(arguments);
}
Module.createOpen = createOpen;

/**
 * Creates a closed queuing workload with a given number of users, a think time, and either BATCH or TERM class.
 * @param {string} name - The name to give the workload.
 * @param {Workload} shouldBeClass - The worload class, either pdq.BATCH or pdq.TERM.
 * @param {number} N - The number of active  users in the system.
 * @param {number} Z - The average think time between requests for a user.
 */
function createClosed(name, shouldBeClass, N, Z) {
    return ccall('PDQ_CreateClosed', null, ["string", "number", "number", "number"])(arguments);
}
Module.createClosed = createClosed;

/**
 * Creates a multiserver (open or closed) queue.
 * @param {number} servers - The number of servers.
 * @param {string} name - The name of system.
 * @param {DeviceType} deviceType - The kind of system, either pdq.MSO or pdq.MSC.
 * @param {Discipline} schedule - The queueing schedule.
 */
function createMultiNode(servers, name, deviceType, schedule) {
    ccall('PDQ_CreateMultiNode', "number", ["number", "string", "number", "number"])(arguments);
}
Module.createMultiNode = createMultiNode;

/**
 * Creates a single queueing center in either a closed or open circuit
 * @param {string} name  - The name of the queueing center.
 * @param {DeviceType} device  - The kind of center, open or closed.
 * @param {Discipline} schedule - The queueing discipline.
 */
function createNode(name, device, schedule) {
    ccall('PDQ_CreateNode', null, ["string", "number", "number"])(arguments);
}
Module.createNode = createNode;

/**
 * Set the demand ofload at a specified node a particular node
 * @param {string} name  - The name of the node.
 * @param {string} workload  - The name of the workload. For example, "requests", or "customers".
 * @param {number} time - The workload, eg 400 for 400 Requests per second.
 */
function setDemand(name, workload, time) {
    ccall('PDQ_SetDemand', null, ["string", "string", "number"])(arguments);
}
Module.setDemand = setDemand;

// Define the service demand in terms of the service time and visit count.
/**
 * 
 * @param {string} nodeName The name of the node on which to set the service demand.
 * @param {string} workName The name of the worload to set.
 * @param {number} visits   The number of visits, in the work unit (eg 5 jobs).
 * @param {number} service  The service time, in the time unit (eg per hour).
 */
function setVisits(nodeName, workName, visits, service) {
    ccall('PDQ_SetVisits', null, ["string", "string", "number", "number"])(arguments);
}
Module.setVisits = setVisits;

/**
 * Set the work unit.
 * @param {string} unitName The work unit, eg: jobs, customers, orders.
 */
function setWUnit(unitName) {
    ccall('PDQ_SetWUnit', null, ["string"])(arguments);
}
Module.setWUnit = setWUnit;
/**
 * Set the time unit.
 * @param {string} unitName The time unit, eg: minutes, seconds, hours, years.
 */
function setTUnit(unitName) {
    ccall('PDQ_SetTUnit', null, ["string"])(arguments);
}
Module.setTUnit = setTUnit;

/**
 * Add a comment to the report. Useful as a way to add a note to them model.
 * @param {string} comment 
 */
function setComment(comment) {
    ccall('PDQ_SetComment', null, ["string"])(arguments);
}
Module.setComment = setComment;

/**
 * Read a comment written into the model, if one was set earlier by setComment().
 */
function getComment() {
    ccall('PDQ_GetComment', "string", [])();
}
Module.getComment = getComment;


/**
 * Solve the model for its characteristics, passing in the intended solving method.
 * @param {SolutionMethod} method The method to use to calculate the solution.
 */
function solve(method) {
    ccall('PDQ_Solve', "number", ["number"])(arguments);
}
Module.solve = solve;

/**
 * Print the report. Currently goes to the console.log, but this will be fixed in
 * an upcoming release.
 */
function report() {
    //TODO: trap the stdout output and return it as a string from this function
    ccall('PDQ_Report', null, [])();
}
Module.report = report;

/**
 * Print the nodes in the model.
 */
function printNodes() {
    //TODO: trap the stdout output and return it as a string from this function
    ccall('print_nodes', null, [])();
}
Module.printNodes = printNodes;

/**
 * Get the number of created streams.
 * @return {number} The number of created streams
 */
function getStreamCount() {
    ccall('PDQ_GetStreamsCount', "number", [])();
}
Module.getStreamCount = getStreamCount;

/**
 * Get the number of created nodes.
 * @return {number} The number of created nodes
 */
function getNodesCount() {
    ccall('PDQ_GetNodesCount', "number", [])();
}
Module.getNodesCount = getNodesCount;

/**
 * Returns the system response time for the specified workload
 * @param {Workload} shouldBeClass either TERM, TRANS or BATCH.
 * @param {string} wName the name of the workload 
 */
function getResponse(shouldBeClass, wName) {
    ccall('PDQ_GetResponse', "number", ["number", "string"])(arguments);
}
Module.getResponse = getResponse;


/**
 * Returns the device residence time for the specified workload
 * @param {string} device 
 * @param {string} work 
 * @param {Workload} shouldBeClass 
 */
function getResidenceTime(device, work, shouldBeClass) {
    ccall('PDQ_GetResidenceTime', "number", ["string", "string", "number"])(arguments);
}
Module.getResidenceTime = getResidenceTime;

/**
 * Returns the system throughput for the specified workload
 * @param {Workload} shouldBeClass 
 * @param {string} wName 
 */
function getThruput(shouldBeClass, wName) {
    ccall('PDQ_GetThruput', "number", ["number", "string"])(arguments);
}
Module.getThruput = getThruput;

/**
 * Returns the optimal user load for the specified workload
 * @param {Workload} shouldBeClass 
 * @param {string} wName 
 */
function getLoadOpt(shouldBeClass, wName) {
    ccall('PDQ_GetLoadOpt', "number", ["number", "string"])(arguments);
}
Module.getLoadOpt = getLoadOpt;

/**
 * Get the utilization of a device.
 * @param {string} device The device name
 * @param {string} work The name of the workload
 * @param {Workload} shouldBeClass The type of the workload
 */
function getUtilization(device, work, shouldBeClass) {
    ccall('PDQ_GetUtilization', "number", ["string", "string", "number"])(arguments);
}
Module.getUtilization = getUtilization;

/**
 * Get the average queue length of a device.
 * @param {string} device The device name
 * @param {string} work The workload
 * @param {Workload} shouldBeClass The type of the workload
 */
function getQueueLength(device, work, shouldBeClass) {
    ccall('PDQ_GetQueueLength', "number", ["string", "string", "number"])(arguments);
}
Module.getQueueLength = getQueueLength;

/**
 * Get the maximum throughput of a workload
 * @param {Workload} shouldBeClass The type of the workload.
 * @param {string} wName The name of the workload.
 */
function getThruMax(shouldBeClass, wName) {
    ccall('PDQ_GetThruMax', "number", ["number", "string"])(arguments);
}
Module.getThruMax = getThruMax;

/**
 * Set the debug mode on/off
 * @param {number} mode Either 1 or 0.
 */
function setDebug(mode) {
    ccall('PDQ_SetDebug', null, ["number"])(arguments);
}
Module.setDebug = setDebug;

Module.log = []
Module.print = (text) => {
    if (arguments.length > 1) {
        text = Array.prototype.slice.call(arguments).join(' ');
    }
    Module.log += text;
}
Module.clearLog = () => { Module.log = [] }

const VOID = 0;
Module.VOID = VOID;           // Queueing Network Types

/** {number}  An open queueing network.*/
const OPEN = 1;
Module.OPEN = OPEN;

/** {number}  An closed queueing network.*/
const CLOSED = 2;
Module.CLOSED = CLOSED;
/** @typedef {OPEN | CLOSED} NetworkType */

/**
 * A standard queueing center.
 */
const CEN = 3;
Module.CEN = CEN;


/** An unspecified delay center. */
const DLY = 4;
Module.DLY = DLY;

/** A multi-server open queue (M/M/m) */
const MSO = 5;
Module.MSO = MSO;

/** @typedef {CEN | DLY | MSOC | MSC } DeviceType */

/** A Multi-server closed queue (M/M/m/N/N). Uses the FESC (flow equivalent service center) algorithm.*/
const MSC = 6;            /* Multi-Server Closed M/M/m/N/N uses FESC algorithm */
Module.MSC = MSC;

/** An infinite server.  */
const ISRV = 7;
Module.ISRV = ISRV;


/** {number} First-come first-serve queueing discipline. */
const FCFS = 8;
Module.FCFS = 8;

/** 
 * {number} Processor sharing queueing discipline.*/
const PHSR = 9;
Module.PSHR = PHSR;

/** {number} Last-come first-serve queueing discipline.*/
const LCFS = 10;
Module.LCFS = LCFS;

/** @typedef {ISRV | FCFS | PHSR | LCFS} Discipline */

/**Terminal-style workload, where users have a non-zero think time.*/
const TERM = 11;
Module.TERM = TERM;
/**Deprecated */
const TRANS = 12;
Module.TRANS = TRANS;
/**Batch-style workload, where the think-time is 0; after a request is served it goes right back in the system without waiting. */
const BATCH = 13;
Module.BATCH = BATCH;

/** @typedef {TERM | TRANS | BATCH } Workload */


/** {number} Use the exact solution. For TERM, BATCH, and FESC workloads. */
Module.EXACT = 14;         // for TERM ; BATCH & FESC workloads (NJG on Nov 16 , 2020)
/** {number} Approximate the solution. For large TERM and BATCH workloads. */
Module.APPROX = 15;        // for large TERM and BATCH workloads
/** {number} Canonical solution for TRANS workloads in an OPEN network. */
Module.CANON = 16;         // for TRANS workloads (OPEN network) 
/** {number} Prep for multiclass MSO workloads (NJG on May 8 , 2016) */
Module.APPROXMSO = 17;


Module.VISITS = 18;
Module.DEMAND = 19;

// Alternative more accurate names for solver methods
// Added here for easier enumeration in PDQ 7.0 (NJG on Nov 18, 2020)

/** EXACT alternative */
const EXACTMVA = 20;
Module.EXACTMVA = EXACTMVA;

/**APPROX alternative */
const APPROXMVA = 21;
Module.APPROXMVA = APPROXMVA;

/** CANON alternative (connotes 'continuous' workflow) */
const STREAMING = 22;
Module.STREAMING = STREAMING;

/** @typedef {EXACT | APPROX | CANON | APPROXMSO | EXACTMVA | APPROXMVA | STREAMING} SolutionMethod */