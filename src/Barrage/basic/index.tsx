import React, { useRef, useCallback } from 'react';

import type { IBasicProps } from './interface';

import styles from './index.less';

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min); // 生成随机数

// 随机抽取数组中的数
const getRandomData = (data: string[]) => {
  const index = random(0, data.length);
  return data[index];
};

const BasicComponent: React.FC<IBasicProps> = (props) => {
  const { data, rows } = props;
  const containerRef = useRef<HTMLDivElement>();
  const containerPosition = useRef({
    right: 0,
    left: 0,
  });

  const createBarrageDom = (parent: HTMLDivElement, text: string) => {
    const width = parent.getBoundingClientRect().width;

    const dom = document.createElement('div');
    dom.className = 'barrageItem';
    dom.style.left = width + random(40, 70) + 'px';
    dom.innerText = text;
    parent.appendChild(dom);
  };

  const renderBarrage = () => {
    // @ts-ignore
    const tracks: HTMLDivElement[] = containerRef.current?.querySelectorAll(`.${styles.track}`);
    const { right: startPosition, left: endPosition } = containerPosition.current;

    tracks.forEach((track) => {
      const firstChild: HTMLDivElement = track.firstChild as HTMLDivElement;
      const lastChild: HTMLDivElement = track.lastChild as HTMLDivElement;

      // 如果第一个和最后一个节点都不存在，说明是初始化状态
      if (!firstChild && !lastChild) {
        const text = getRandomData(data);
        createBarrageDom(track, text);
        return;
      }

      // 滚出屏幕的子节点做移除操作
      if (firstChild && firstChild.getBoundingClientRect().right <= endPosition) {
        track.removeChild(firstChild);
      }

      // 判断最后一个节点是否已经完整在屏幕中
      if (lastChild && lastChild.getBoundingClientRect().right < startPosition) {
        const text = getRandomData(data);
        createBarrageDom(track, text);
      }
    });

    barrageMove();

    window.requestAnimationFrame(renderBarrage);
  };

  const barrageMove = () => {
    // @ts-ignore
    const barrages: HTMLDivElement[] = containerRef.current?.querySelectorAll(`.barrageItem`);
    barrages.forEach((barrage: HTMLDivElement) => {
      const curTransform = Number(barrage.style.left.replace(/px/g, ''));
      // 每次滚动完成后重置回初始位置
      // Math.abs((index % 2) - 1) 最后一个滚动完成代表一个周期执行完毕，那么直接放置在0即可
      barrage.style.left = curTransform - 1 + 'px';
    });
  };

  const init = useCallback((node: HTMLDivElement) => {
    if (node && node !== null) {
      containerRef.current = node;
      containerPosition.current = {
        right: node.getBoundingClientRect().right,
        left: node.getBoundingClientRect().left,
      };
      window.requestAnimationFrame(renderBarrage);
    }
  }, []);

  return (
    <div className={styles.container} ref={init}>
      {Array(rows)
        .fill(1)
        .map((rows, index) => (
          <div className={styles.track} key={index} />
        ))}
    </div>
  );
};

export default BasicComponent;
