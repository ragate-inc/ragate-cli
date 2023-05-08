import Entry from 'entry/handler';

void (async () => {
  const entry = new Entry();
  await entry.run();
})();
