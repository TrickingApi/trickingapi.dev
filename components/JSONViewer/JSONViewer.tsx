import React, {useState, useEffect} from 'react';
import { JSONTree } from 'react-json-tree';


export const DynamicViewer = ({data}: any) => {
  return (
      //@ts-ignore
      <JSONTree
        data={data}
        //hideRoot
        //theme={dynamicTheme}
        /*shouldExpandNode={(keyName: string, data: any) =>
          // Collapse long arrays, large objects (except array items),
          // and arrays that are direct children of array items
          !(
              (Array.isArray(data) && data.length > 3) ||
              (!Number.isInteger(keyName[0]) &&
                  Object.keys(data).length > 3) ||
              (Number.isInteger(keyName[1]) && Array.isArray(data))
          )
        }*/
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
    <div className={'json-viewer'}>
      <div className={'json'}>
        {!isMounted || viewRaw ? (
            <pre className={'code'}>
                <code>{jsonString}</code>
            </pre>
        ) : (
          <JSONTree
          data={data}/>
        )}
      </div>
      <div className={'toolbar'}>
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
      <style jsx>{`
        .json-viewer {

        }

        .json {

        }

        .code {

        }

        .toolbar {

        }
      `}</style>
    </div>
  );
}

export default JsonViewer;