import { useState, useEffect, useCallback } from 'react';
import { dummyStepGen } from 'utils/dummyStepGen';

export type StepCountItem = {
  endDate: Date;
  startDate: Date;
  unit: string;
  value: number;
};

const useFitStepData = (days: number = 31) => {
  const [queryData, setQueryData] = useState<StepCountItem[]>();

  const queryAggregatedSuccessCallback = useCallback(
    (data: StepCountItem[]) => {
      const reversedData = data.slice().reverse();
      setQueryData(reversedData);
    },
    [],
  );

  const queryAggregated = useCallback(() => {
    (navigator as any).health.queryAggregated(
      {
        startDate: new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000),
        endDate: new Date(),
        dataType: 'steps',
        bucket: 'day',
      },
      queryAggregatedSuccessCallback,
      (err: any) => {
        console.error(`queryAggregated error: ${err}`);
      },
    );
  }, [days, queryAggregatedSuccessCallback]);

  const requestAuthorization = useCallback(() => {
    (navigator as any).health.requestAuthorization(
      [
        {
          read: ['steps'],
        },
      ],
      queryAggregated,
      (err: any) => {
        console.error(`requestAuthorization error: ${err}`);
      },
    );
  }, [queryAggregated]);

  const successAvailableCallback = useCallback(
    (available: boolean) => {
      (navigator as any).health.promptInstallFit(
        requestAuthorization,
        (err: any) => {
          console.error(`promptInstallFit error: ${err}`);
        },
      );
    },
    [requestAuthorization],
  );

  const getStepData = useCallback(() => {
    const nav = navigator as any;
    if (nav.header) {
      nav.health.isAvailable(successAvailableCallback, (err: any) => {
        console.log(`isAvailable error: ${err}`);
      });
    } else {
      const dummyData: StepCountItem[] = dummyStepGen(days);
      setQueryData(dummyData);
    }
  }, [successAvailableCallback, days]);

  useEffect(() => {
    getStepData();
  }, [days, getStepData]);

  return { getStepData, queryData };
};

export default useFitStepData;
