import { WorkerFetch } from '@warp-drive/experiments/worker-fetch';

export const Fetch = new WorkerFetch(
  new SharedWorker(new URL('../workers/data-worker.ts', import.meta.url), {
    name: 'DataWorker',
    type: 'module',
  })
);
