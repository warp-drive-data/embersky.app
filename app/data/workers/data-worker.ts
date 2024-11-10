import Store from '@ember-data/store';
import RequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';
import JSONAPICache from '@ember-data/json-api';

import { DataWorker, CacheHandler } from '@warp-drive/experiments/data-worker';
import type { CacheCapabilitiesManager } from '@ember-data/store/types';
import { CachePolicy } from '@ember-data/request-utils';
import { SchemaService } from '@warp-drive/schema-record/schema';
import { BlueskyHandler } from '../handlers/bluesky';

class WorkerStore extends Store {
  name = 'worker:main';

  requestManager = new RequestManager()
    .use([BlueskyHandler, Fetch])
    .useCache(CacheHandler);

  lifetimes = new CachePolicy({
    apiCacheHardExpires: 1000 * 60 * 60 * 24 * 2, // 2 days
    apiCacheSoftExpires: 1000 * 30, // 30 seconds
  });

  createCache(capabilities: CacheCapabilitiesManager) {
    return new JSONAPICache(capabilities);
  }

  createSchemaService() {
    return new SchemaService();
  }
}

new DataWorker(WorkerStore);
