import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const withData = (Component) => (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`/assets/movement.${params.movement}.${params.item}.json`)
      .then((d) => d.json())
      .then((d) => setData(d))
      .then(() => setLoading(false));
  }, [params]);

  return <Component {...props} loading={loading} data={data} />;
};

export default withData;
