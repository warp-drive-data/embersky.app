import type { AtIdentifierString } from 'embersky/data/types/base';
import type { IntRange } from 'embersky/types/utils';

/**
 * Get private preferences attached to the current account. Expected use is
 * synchronization between multiple devices, and import/export during account
 * migration.
 *
 * Requires auth.
 *
 * https://docs.bsky.app/docs/api/app-bsky-actor-get-preferences
 *
 * @auth required
 */
export function getPreferences() {
  return {
    op: 'app.bsky.actor.getPreferences',
    method: 'GET',
    url: '/xrpc/app.bsky.actor.getPreferences',
  };
}

/**
 * Get detailed profile view of an actor. Does not require auth,
 * but contains relevant metadata with auth.
 *
 * https://docs.bsky.app/docs/api/app-bsky-actor-get-profile
 *
 * @auth optional
 * @param actor - {@link AtIdentifierString} the Handle or DID of the account to fetch profile of
 */
export function getProfile(actor: AtIdentifierString) {
  return {
    op: 'app.bsky.actor.getProfile',
    method: 'GET',
    url: `/xrpc/app.bsky.actor.getProfile?actor=${actor}`,
  };
}

/**
 * Get detailed profile views of multiple actors.
 *
 * https://docs.bsky.app/docs/api/app-bsky-actor-get-profiles
 *
 * @auth optional
 * @param actors - {@link AtIdentifierString}[] the Handle or DID of the account to fetch profile of
 */
export function getProfiles(actors: AtIdentifierString[]) {
  return {
    op: 'app.bsky.actor.getProfiles',
    method: 'GET',
    url: `/xrpc/app.bsky.actor.getProfiles?actors=${actors.join(',')}`,
  };
}

/**
 * Get a list of suggested actors. Expected use is discovery of
 * accounts to follow during new account onboarding.
 *
 * https://docs.bsky.app/docs/api/app-bsky-actor-get-suggestions
 *
 * @auth optional
 * @param cursor - string the cursor to paginate through the list of suggestions
 * @param limit - {@link IntRange}<1, 100> the number of suggestions to return, default 50
 */
export function getSuggestions(
  cursor: string = '',
  limit: IntRange<1, 100> = 50
) {
  return {
    op: 'app.bsky.actor.getSuggestions',
    method: 'GET',
    url: `/xrpc/app.bsky.actor.getSuggestions?limit=${String(limit)}&cursor=${cursor}`,
  };
}

/**
 * Set the private preferences attached to the account.
 *
 * https://docs.bsky.app/docs/api/app-bsky-actor-put-preferences
 *
 * @auth required
 */
// FIXME type the available preferences
export function putPreferences(preferences: unknown) {
  return {
    op: 'app.bsky.actor.putPreferences',
    method: 'PUT',
    url: '/xrpc/app.bsky.actor.putPreferences',
    body: JSON.stringify(preferences),
  };
}

/**
 * Find actor suggestions for a prefix search term.
 * Expected use is for auto-completion during text field entry.
 *
 * Does not require auth.
 *
 * https://docs.bsky.app/docs/api/app-bsky-actor-search-actors-typeahead
 *
 * @auth optional
 * @param search - string the search term to match
 * @param limit - {@link IntRange}<1, 100> the number of suggestions to return, default 10
 */
export function searchActorsTypeahead(
  search: string = '',
  limit: IntRange<1, 100> = 10
) {
  return {
    op: 'app.bsky.actor.searchActorsTypeahead',
    method: 'GET',
    url: `/xrpc/app.bsky.actor.searchActorsTypeahead?q=${search}&limit=${String(limit)}`,
  };
}

/**
 * Find actors (profiles) matching search criteria.
 *
 * Does not require auth.
 *
 * https://docs.bsky.app/docs/api/app-bsky-actor-search-actors
 *
 * @auth optional
 * @param search - string the search term to match
 * @param limit - {@link IntRange}<1, 100> the number of suggestions to return, default 10
 */
export function searchActors(
  search: string = '',
  cursor: string = '',
  limit: IntRange<1, 100> = 25
) {
  return {
    op: 'app.bsky.actor.searchActors',
    method: 'GET',
    url: `/xrpc/app.bsky.actor.searchActors?q=${search}&limit=${String(limit)}&cursor=${cursor}`,
  };
}
