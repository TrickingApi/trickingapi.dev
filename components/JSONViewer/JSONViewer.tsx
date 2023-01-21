import React, {useState, useEffect, FunctionComponent} from 'react';
import { JSONTree, KeyPath } from 'react-json-tree';
import styles from './JSONViewer.module.scss';

const defaultTheme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

interface IViewerProps {
  data: any;
  theme?: any;
}

export const DynamicViewer: FunctionComponent<IViewerProps> = (props) => {
  return (
      <JSONTree
        data={props.data}
        hideRoot
        theme={props.theme}
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

const JsonViewer: FunctionComponent<IViewerProps> = (props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [viewRaw, setViewRaw] = useState(true);

  useEffect(() => {
      setIsMounted(true);
      setViewRaw(false);
  }, []);

  const jsonString = JSON.stringify(props.data, null, 2) || '';
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
            data={props.data}
            theme={props.theme ?? defaultTheme}
            />
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