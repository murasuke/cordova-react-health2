import {
  getFirestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  startAfter,
  getDocs,
} from 'firebase/firestore';

import { StepCountItem } from 'hooks/useFitApi';

/**
 * Firestoreにデータを登録する
 * @param userId
 * @param userName
 * @param stepList 歩数データの配列
 */
export const storeStepList = async (
  userId: string,
  userName: string,
  stepList: StepCountItem[],
) => {
  const db = getFirestore();

  await deleteStepList(userId);

  stepList.forEach((item) => {
    addDoc(collection(db, 'steps'), {
      userId,
      userName,
      startDate: item.startDate,
      endDate: item.endDate,
      unit: item.unit,
      value: item.value,
    });
  });
};

export const deleteStepList = async (userId: string) => {
  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, 'steps'));

  await Promise.all(
    querySnapshot.docs.map(async (item) => {
      await deleteDoc(doc(db, 'steps', item.id));
    }),
  );
};
/**
 *
 * @param userId
 * @param startDate
 * @param term
 * @returns
 */
export const queryStepList = async (
  userId: string,
  startDate: Date,
  term: number,
): Promise<StepCountItem[]> => {
  const endDate = new Date(startDate.getTime() + term * 24 * 60 * 60 * 1000);
  const db = getFirestore();
  const stepRef = collection(db, 'steps');

  const stepQuery = query(
    stepRef,
    where('startDate', '>=', startDate),
    orderBy('startDate', 'desc'),
    // where('endDate', '<=', endDate),
  );

  const snapshot = await getDocs(stepQuery);
  const stepList: StepCountItem[] = [];
  snapshot.forEach((doc) => {
    stepList.push({
      startDate: doc.data().startDate.toDate(),
      endDate: doc.data().endDate.toDate(),
      unit: doc.data().unit,
      value: doc.data().value,
    });
  });

  return stepList;
};

export const queryWeekStepList = async (
  userId: string,
  startDate: Date,
  term: number,
): Promise<StepCountItem[]> => {
  const endDate = new Date(startDate.getTime() + term * 24 * 60 * 60 * 1000);
  const db = getFirestore();
  const stepRef = collection(db, 'steps');

  const stepQuery = query(
    stepRef,
    where('startDate', '>=', startDate),
    orderBy('startDate', 'desc'),
    // where('endDate', '<=', endDate),
  );

  const snapshot = await getDocs(stepQuery);
  const stepList: StepCountItem[] = [];
  let week = 0;
  let start: Date;
  let totalStep: number = 0;
  snapshot.forEach((doc) => {
    if (week === 0) {
      start = doc.data().startDate.toDate();
      totalStep += doc.data().value;
    }
    totalStep += doc.data().value;
    week++;

    if (week === 7) {
      totalStep += doc.data().value;
      stepList.push({
        startDate: start,
        endDate: doc.data().endDate.toDate(),
        unit: doc.data().unit,
        value: totalStep,
      });
      week = 0;
      totalStep = 0;
    }
  });

  return stepList;
};
