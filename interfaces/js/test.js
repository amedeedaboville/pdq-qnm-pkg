require('./dist/pdq.js')().then(pdq => {
    const requests = 400;
    const threads = 300;
    const service_time = 0.444;

    pdq.init("My model");
    pdq.createClosed("Requests", pdq.BATCH, requests, 0.0);
    pdq.createMultiNode(threads, "Threads", pdq.MSC, pdq.FCFS);
    pdq.setDemand("Threads", "Requests", service_time);
    pdq.setWUnit("Reqs");
    pdq.solve(pdq.EXACT);
    pdq.report();
})