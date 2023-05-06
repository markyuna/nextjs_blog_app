import useSWR from 'swr';

export function SWRWrapper({ endpoint }) {
  const { data, error } = useSWR(`${baseURL}${endpoint}`);

  if (error) return <p>Error</p>;
  if (!data) return <p>Loading...</p>;

  return <div>{JSON.stringify(data)}</div>;
}
