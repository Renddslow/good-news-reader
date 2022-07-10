import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const getPlans = (pageUrl) =>
  Promise.all([
    fetch('/assets/assets.json').then((d) => d.json()),
    fetch(pageUrl).then((d) => d.json()),
  ]);

const withData =
  (Component, planOnly: boolean = false) =>
  (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const params = useParams();

    useEffect(() => {
      setLoading(true);
      getPlans(`/assets/${params.page}.json`).then(([plan, page]) => {
        setData({ plan, page });
        setLoading(false);
      });
    }, [params]);

    return <Component {...props} loading={loading} data={data} />;
  };

export default withData;
