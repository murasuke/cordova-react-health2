const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

export const dummyStepGen = (days: number) => {
  const ymd = (add: number = 0) => {
    const day = new Date();
    day.setDate(day.getDate() + add);
    day.setHours(0, 0, 0, 0);
    return day;
  };

  const dummyData = [...Array(days + 1).keys()].map((key) => {
    return {
      unit: 'count',
      value: random(1000, 10000),
      startDate: ymd(-key),
      endDate: ymd(-key + 1),
    };
  });

  return dummyData;
};
