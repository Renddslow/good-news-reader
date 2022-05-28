import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const withData =
  (Component, planOnly: boolean = false) =>
  (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const params = useParams();

    useEffect(() => {
      setLoading(true);
      const url = planOnly
        ? '/assets/asset-plan.json'
        : `/assets/movement.${params.movement}.${params.item}.json`;
      fetch(url)
        .then((d) => d.json())
        .then((d) => setData(d))
        .then(() => setLoading(false));
    }, [params]);

    return <Component {...props} loading={loading} data={data} />;
  };

export default withData;
