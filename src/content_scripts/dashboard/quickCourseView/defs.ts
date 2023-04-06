export type Filter = string;

const semesterMap = {
  '1/2': '前期',
  '2/2': '後期',
  '1/1': '通年',
  '1/4': '第1クオーター',
  '2/4': '第2クオーター',
  '3/4': '第3クオーター',
  '4/4': '第4クオーター',
  'unfixed': '未定',
} as const;

const semesterOrder = {
  '1/2': 1,
  '2/2': 2,
  '1/1': 3,
  '1/4': 4,
  '2/4': 5,
  '3/4': 6,
  '4/4': 7,
  'unfixed': 8,
} as const;

const weekOfDayMap = {
  'sun': '日曜',
  'mon': '月曜',
  'tue': '火曜',
  'wed': '水曜',
  'thu': '木曜',
  'fri': '金曜',
  'sat': '土曜',
} as const;

const weekOfDayOrder = {
  'sun': 6,
  'mon': 0,
  'tue': 1,
  'wed': 2,
  'thu': 3,
  'fri': 4,
  'sat': 5,
} as const;

export {
  semesterMap,
  semesterOrder,
  weekOfDayMap,
  weekOfDayOrder
};
