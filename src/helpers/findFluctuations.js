const findFluctuations = (data, percent) => {
  const results = { o: [], h: [], date: [], p: [], total: 0 };
  for (const [i] of data.o.entries()) {
    const fluct = data.h[i] / data.o[i];
    if (fluct >= percent) {
      const dateObject = new Date(data.t[i] * 1000);
      results.o.unshift(data.o[i]);
      results.h.unshift(data.h[i]);
      results.date.unshift(dateObject.toLocaleDateString());
      results.p.unshift(convertPercent(fluct));
      results.total++;
    }
  }
  return results;
};

const convertPercent = (num) => Math.round((num - 1) * 10000) / 100;

export default findFluctuations;
