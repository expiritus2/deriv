import React, { useEffect } from 'react';
import { useStore } from './store';
import { observer } from 'mobx-react-lite';
import { Tabs } from 'components';
import styles from './styles.module.scss';

function App() {
  const { activeSymbols, history, tick } = useStore();

  useEffect(() => {
    activeSymbols.getActiveSymbols();
    history.getTicksHistory();
    tick.subscribeTicks();

    return () => {
      tick.unsubscribeTicks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (activeSymbols.loading && !activeSymbols.list.length) {
    return <div>Loading...</div>
  }

  return <Tabs className={styles.content} />;
}

export default observer(App);
