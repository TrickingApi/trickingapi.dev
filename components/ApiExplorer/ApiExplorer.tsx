import React, {useState, useEffect, FunctionComponent} from 'react';
import pop360 from './pop360.json';
import LinkButton from '../LinkButton/LinkButton';
import styles from './ApiExplorer.module.scss';
import Input from './Input';
import JsonViewer from '../JSONViewer/JSONViewer';
// @ts-ignore
import { Inter } from '@next/font/google'
import { BASE_API_URL } from '../../utils/constants';

const inter = Inter({ subsets: ['latin'] });

const ApiExplorer: FunctionComponent = () => {
  const [resourceUrl, setResourceUrl] = useState('tricks/pop360');
  const [resourceData, setResourceData] = useState(pop360);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const getMessage = () => {
    if (notFound) {
      return 'Resource not found';
    } else if (error) {
      return `An error occurred: ${error}`;
    } else if (isLoading) {
      return 'Loading...';
    } else if (resourceData) {
      return `Hooray, loaded ${resourceData.name || resourceUrl}`;
    } else {
      return 'An unknown error has occurred, please file an issue with https://github.com/TrickingApi/trickingapi.dev/issues and will we try to triage.';
    }
  }

  // Fetch the new data whenever the resourceUrl changes
  useEffect(() => {
    fetchData(resourceUrl);
  }, [resourceUrl]);

  const Hint = ({value}:any) => (
    <LinkButton
        className={styles.hint}
        onClick={() => setResourceUrl(value)}
    >
        {value}
    </LinkButton>
  );

  return (
    <div className={styles.container}>
      <h2 className={inter.className}>Try it out now!</h2>
      <Input
          defaultValue={resourceUrl}
          onSubmit={(value: string) => setResourceUrl(value)}
      />
      <p className={`${styles.hint_sentence} ${inter.className}`}>
        Need a hint? Try <Hint value="tricks/butterflyTwist" />{' '}
        <Hint value='categories/vert-kick' />{' '}<Hint value="tricks" />{' '}
        <Hint value='categories/tricks' />{' '}<Hint value="tricks/names"/>{' '}
      </p>
      <h3 className={`${styles.directlink} ${inter.className}`}>
          Direct link to results:{' '}
          <a href={BASE_API_URL + resourceUrl} target='_blank' rel='noreferrer'>
              {BASE_API_URL + resourceUrl}
          </a>
      </h3>
      <p className={`${styles.message} ${inter.className}`}>{getMessage()}</p>

      <JsonViewer data={resourceData} />
    </div>
  );
}

export default ApiExplorer;