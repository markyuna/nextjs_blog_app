/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import Author from './_child/author';
import Link from 'next/link';
import Image from 'next/image';
import useFetcher from '../lib/fetcher';
import Spinner from './_child/spinner';
import Error from './_child/error';

export default function Section4() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = useFetcher('api/popular');
        setData(res);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  const renderPost = (post) => {
    const { id, title, category, img, published, author } = post;

    return (
      <div className="flex gap-5" key={id}>
        <div className="image flex flex-col justify-start">
          <Link href={`/posts/${id}`}>
            <a>
              <Image src={img || ''} className="rounded" width={300} height={250} alt="" />
            </a>
          </Link>
        </div>
        <div className="info flex justify-center flex-col">
          <div className="cat">
            <Link href={`/posts/${id}`}>
              <a className="text-orange-600 hover:text-orange-800">{category || 'No Category'}</a>
            </Link>
            <Link href={`/posts/${id}`}>
              <a className="text-gray-800 hover:text-gray-600">- {published || ''}</a>
            </Link>
          </div>
          <div className="title">
            <Link href={`/posts/${id}`}>
              <a className="text-xl font-bold text-gray-800 hover:text-gray-600">{title || 'No Title'}</a>
            </Link>
          </div>
          {author ? <Author {...author} /> : null}
        </div>
      </div>
    );
  };

  return (
    <section className="container mx-auto md:px-20 py-16">
      <div className="grid lg:grid-cols-2">
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Business</h1>
          <div className="flex flex-col gap-6">
            {data.slice(1, 4).map((post) => renderPost(post))}
          </div>
        </div>
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Travel</h1>
          <div className="flex flex-col gap-6">
            {data.slice(4, 7).map((post) => renderPost(post))}
          </div>
        </div>
      </div>
    </section>
  );
}
