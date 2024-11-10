import type { Handler } from '@ember-data/request';

export const BlueskyHandler: Handler = {
  request(context, next) {
    return next(context.request);
  },
};
