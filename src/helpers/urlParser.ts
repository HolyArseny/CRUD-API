export default (url: string|undefined): string[] => {
  if (!url) return [];
  return url.split('/').filter((el: string) => el);
};