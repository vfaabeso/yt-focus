import { BANNED_TERMS, BANNED_CATEGORIES } from './bannedTerms';

export function normalizeText(value = '') {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
}

export function shouldBlockVideo(item) {
  const title = normalizeText(item?.snippet?.title || '');
  const desc = normalizeText(item?.snippet?.description || '');
  const channel = normalizeText(item?.snippet?.channelTitle || '');
  const text = `${title} ${desc} ${channel}`;

  const blockedByTerm = BANNED_TERMS.some(term => text.includes(term));
  const blockedByCategory = BANNED_CATEGORIES.includes(item?.snippet?.categoryId);

  return blockedByTerm || blockedByCategory;
}