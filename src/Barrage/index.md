```jsx
import React from 'react';
import { Barrage } from 'react-barrage';

const dataSource = [
  '前方高能预警,请非战斗人员撤离。',
  '空降成功/空难现场。',
  '有生之年系列。',
  '说前方高能的放学别走,我保证不打死你/校门口见。',
  '完结撒花',
];

export default () => {
  return <Barrage.Basic data={dataSource} rows={2} />;
};
```
