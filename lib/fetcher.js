import useSWR from 'swr';

const baseURL = "http://localhost:3000/";

const response = (...args) => fetch(...args).then(res => res.json())

export default function useFetcher(endpoint){
    const { data, error } = useSWR(`${baseURL}${endpoint}`, response)
    fetch('/api/posts')
  .then(response => response.json())
  .then(data => console.log(data))

    return {
        data,
        isLoading : !error && !data,
        isError : error
    }
}
