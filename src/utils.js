function wrapIt(promise) {
  return Promise.allSettled([promise]).then(([{ value, reason }]) => [
    value,
    reason,
  ]);
}
