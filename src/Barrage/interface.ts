export interface IBarrageProps {
  /* 弹幕数据 */
  data: string[];
  /* 弹幕行数 */
  rows: number;
  /* 弹幕滚动速度（500ms） */
  speed: number | 'random';
}
