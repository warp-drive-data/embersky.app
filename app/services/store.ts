import JSONAPICache from '@ember-data/json-api';
import RequestManager from '@ember-data/request';
import { CachePolicy } from '@ember-data/request-utils';
import Store, { CacheHandler } from '@ember-data/store';
import type { CacheCapabilitiesManager } from '@ember-data/store/types';
import type { StableRecordIdentifier } from '@warp-drive/core-types';
import {
  instantiateRecord,
  teardownRecord,
} from '@warp-drive/schema-record/hooks';
import type { SchemaRecord } from '@warp-drive/schema-record/record';
import { SchemaService } from '@warp-drive/schema-record/schema';
import { Fetch } from 'embersky/data/handlers/fetch';

export default class AppStore extends Store {
  name = 'main';

  requestManager = new RequestManager().use([Fetch]).useCache(CacheHandler);

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

  instantiateRecord(
    identifier: StableRecordIdentifier,
    createArgs: { [key: string]: unknown }
  ) {
    return instantiateRecord(this, identifier, createArgs);
  }

  teardownRecord(record: SchemaRecord): void {
    teardownRecord(record);
  }
}
