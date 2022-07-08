import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const getPlans = () =>
  Promise.all([
    fetch('/assets/assets.json').then((d) => d.json()),
    fetch('/assets/hyperlinks.json').then((d) => d.json()),
  ]);

const withData =
  (Component, planOnly: boolean = false) =>
  (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const params = useParams();

    useEffect(() => {
      setLoading(true);
      getPlans()
        .then(([plan, hyperlinks]) => setData({ plan, hyperlinks }))
        .then(() => planOnly && setLoading(false));

      if (!planOnly) {
        fetch(`/assets/${params.page}.json`)
          .then((d) => d.json())
          .then((d) => setData((s) => ({ ...s, page: d })))
          .then(() => setLoading(false));
      }
    }, [params]);

    return <Component {...props} loading={loading} data={data} />;
  };

export default withData;
