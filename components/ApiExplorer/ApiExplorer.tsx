import React, {useState, useEffect, FunctionComponent} from 'react';
import pop360 from './pop360.json';
import { Trick, TrickCategory } from 'tricking-ts'
import LinkButton from '../LinkButton/LinkButton';
import styles from './ApiExplorer.module.scss';
import Input from './Input';
import JsonViewer from '../JSONViewer/JSONViewer';

const ApiExplorer: FunctionComponent = () => {
  const [resourceUrl, setResourceUrl] = useState('/tricks/pop360');
  const [resourceData, setResourceData] = useState(pop360);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const BASE_API_URL = '/api/';

  const fetchData = (resourceUrl: string) => {
    setIsLoading(true);
    setNotFound(false);
    setError('');

    fetch(`${BASE_API_URL}${resourceUrl}`)
      .then((res: Response) => {
        if (res.status === 200) {
          return res.json();
        } else {
          setIsLoading(false);
          if (res.status === 404) {
            setNotFound(true);
          } else {
            setError(`${res.status}: ${res.statusText}`);
          }
        }
      }).then((data) => {
        setResourceData(data);
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
        setNotFound(false);
        setError(error);
    });
  }
  // Fetch the new data whenever the resourceUrl changes
  useEffect(() => {
    fetchData(resourceUrl);
  }, [resourceUrl]);

  const getMessage = () => {
    if (notFound) {
      setMessage('Resource not found');
    } else if (error) {
      setMessage(`An error occurred: ${error}`);
    } else if (isLoading) {
      setMessage('Loading...');
    } else if (resourceData) {
      setMessage(`Hooray, loaded resource for ${resourceData.name || resourceUrl}`);
    } else {
      setMessage('An unknown error has occurred, please file an issue with https://github.com/TrickingApi/trickingapi.dev/issues and will we try to triage.');
    }
  }

  const Hint = ({value}:any) => (
    <LinkButton
        className={styles.hint}
        onClick={() => setResourceUrl(value)}
    >
        {value}
    </LinkButton>
  );

  return (
    <div className='api-explorer'>
      <h2>Try it out now!</h2>
      <Input
          defaultValue={resourceUrl}
          urlPrefix={BASE_API_URL}
          onSubmit={(value: string) => setResourceUrl(value)}
      />
            <p className={styles.hint_sentence}>
                Need a hint? Try <Hint value="pokemon/ditto" />,{' '}
                <Hint value='pokemon-species/aegislash' />, <Hint value="type/3" />,{' '}
                <Hint value='ability/battle-armor' />, or{' '}
                <Hint value='pokemon?limit=100000&offset=0' />.
            </p>
            <p>
                Direct link to results:{' '}
                <a href={BASE_API_URL + resourceUrl} target='_blank' rel='noreferrer'>
                    {BASE_API_URL + resourceUrl}
                </a>
            </p>
            <h2 className={styles.message}>{message}</h2>

            <JsonViewer data={resourceData} />
      <style jsx>{`

      `}</style>
    </div>
  );
}

export default ApiExplorer;