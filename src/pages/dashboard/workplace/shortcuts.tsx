import React from 'react';
import {
  Link,
  Card,
  Divider,
  Message,
  Typography,
} from '@arco-design/web-react';
import {
  IconFile,
  IconStorage,
  IconSettings,
  IconMobile,
  IconFire,
  IconUserAdd,
  IconSubscribeAdd,
  IconRobotAdd,
} from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/shortcuts.module.less';

function Shortcuts() {
  const t = useLocale(locale);

  const shortcuts = [
    {
      title: "添加会员",
      key: 'add-member',
      icon: <IconUserAdd />,
    },
    {
      title: '约团课',
      key: 'add-course',
      icon: <IconSubscribeAdd />,
    },
    {
      title: '新增订单',
      key: 'add-order',
      icon: <IconRobotAdd /> ,
    },
  ];

  const recentShortcuts = [
    {
      title: t['workplace.contentStatistic'],
      key: 'Content Statistic',
      icon: <IconStorage />,
    },
    {
      title: t['workplace.contentMgmt'],
      key: 'Content Management',
      icon: <IconFile />,
    },
    {
      title: t['workplace.advancedMgmt'],
      key: 'Advanced Management',
      icon: <IconSettings />,
    },
  ];

  function onClickShortcut(key) {
    console.log(key);
    Message.info({
      content: (
        <span>
          You clicked <b>{key}</b>
        </span>
      ),
    });
  }

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title heading={6}>
          {t['workplace.shortcuts']}
        </Typography.Title>
        {/*<Link>{t['workplace.seeMore']}</Link>*/}
      </div>
      <div className={styles.shortcuts}>
        {shortcuts.map((shortcut) => (
          <div
            className={styles.item}
            key={shortcut.key}
            onClick={() => onClickShortcut(shortcut.key)}
          >
            <div className={styles.icon}>{shortcut.icon}</div>
            <div className={styles.title}>{shortcut.title}</div>
          </div>
        ))}
      </div>
      <Divider />
      {/*<div className={styles.recent}>{t['workplace.recent']}</div>*/}
      {/*<div className={styles.shortcuts}>*/}
      {/*  {recentShortcuts.map((shortcut) => (*/}
      {/*    <div*/}
      {/*      className={styles.item}*/}
      {/*      key={shortcut.key}*/}
      {/*      onClick={() => onClickShortcut(shortcut.key)}*/}
      {/*    >*/}
      {/*      <div className={styles.icon}>{shortcut.icon}</div>*/}
      {/*      <div className={styles.title}>{shortcut.title}</div>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </Card>
  );
}

export default Shortcuts;
