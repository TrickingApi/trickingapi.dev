import React from 'react';
import { NextPage } from 'next';
import SwaggerUI from 'swagger-ui-react';
import "swagger-ui-react/swagger-ui.scss"

type DocsProps = {
  swagger: {}
}

const Docs: NextPage<DocsProps> = (props: DocsProps) => {
  return (
    <div>
      <SwaggerUI spec={props.swagger} />
    </div>
  )
}


export async function getStaticProps() {
  const res = await fetch('https://api.trickingapi.dev/swagger');
  const swagger = await res.json()
  return {
    props: {
      swagger // will be passed to the page component as props
    },
  }
}

export default Docs;