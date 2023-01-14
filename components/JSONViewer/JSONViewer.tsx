import React, {useState, useEffect} from 'react';
import { JSONTree, KeyPath } from 'react-json-tree';
import styles from './JSONViewer.module.scss';


export const DynamicViewer = ({data}: any) => {
  return (
      <JSONTree
        data={data}
        hideRoot
        //theme={dynamicTheme}
        shouldExpandNodeInitially={(keyPath: KeyPath, data: any) =>
          // Collapse long arrays, large objects (except array items),
          // and arrays that are direct children of array items
          !(
              (Array.isArray(data) && data.length > 3) ||
              (!Number.isInteger(keyPath[0]) &&
                  Object.keys(data).length > 3) ||
              (Number.isInteger(keyPath[1]) && Array.isArray(data))
          )
        }
      />
  );
}

const JsonViewer = ({data}: any) => {
  const [isMounted, setIsMounted] = useState(false);
  const [viewRaw, setViewRaw] = useState(true);

  useEffect(() => {
      setIsMounted(true);
      setViewRaw(false);
  }, []);

  const jsonString = JSON.stringify(data, null, 2) || '';
  const jsonSize = new TextEncoder().encode(jsonString).length / 1000; // kB
  const jsonLines = (jsonString.match(/\r?\n/g) || '').length + 1;

  return (
    <div className={styles.jsonviewer}>
      <div className={styles.json}>
        {!isMounted || viewRaw ? (
            <pre className={styles.code}>
                <code>{jsonString}</code>
            </pre>
        ) : (
          <DynamicViewer
            data={data}/>
        )}
      </div>
      <div className={styles.toolbar}>
        <label
          title={
              !isMounted ? 'Disabled until JavaScript loads' : undefined
          }
        >
          <input
            type="checkbox"
            checked={viewRaw}
            disabled={!isMounted}
            onChange={event => setViewRaw(event.target.checked)}
          />{' '}
          View raw JSON ({jsonSize} kB, {jsonLines} lines)
        </label>
      </div>
    </div>
  );
}

export default JsonViewer;