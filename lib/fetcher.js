/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from 'swr';

const baseURL = "http://localhost:3000/";

const response = (...args) => fetch(...args).then(res => res.json())

export default function fetcher(endpoint){
    const { data, error } = useSWR(`${baseURL}${endpoint}`, response)
    return {
        data,
        isLoading : !error && !data,
        isError : error
    }
}

// import useSWR from 'swr';

// const baseURL = "http://localhost:3000/";

// const fetcher = async (url) => {
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new Error(`Error fetching data from ${url}: ${res.statusText}`);
//   }
//   return res.json();
// };

// export default function useFetcher(endpoint) {
//   const { data, error } = useSWR (`${baseURL}${endpoint}`, fetcher);

//   return {
//     data,
//     isLoading: !error && !data,
//     isError: error
//   };
// }
