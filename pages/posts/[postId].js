import React from 'react';
import Format from '../../layout/format';
import Author from '../../components/_child/author';
import Image from 'next/image';
import Related from '../../components/_child/related';
import useFetcher from '../../lib/fetcher';
import ErrorComponent from '../../components/_child/error';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';

async function getPost(postId) {
  // fetch post data from API using postId
  const res = await fetch(`api/posts/${postId}`);
  const data = await res.json();
  return data;
}

export default function Page({ fallback }) {
  const router = useRouter();
  const { postId } = router.query;
  const { data, error } = useFetcher(`api/posts/${postId}`);

  if (error) return <ErrorComponent />;

  return (
    <SWRConfig value={{ fallback }}>
      <Format>
        <section className="container mx-auto md:px-2 py-16 w-1/2">
          <div className="flex justify-center">
            {data && data.author ? <Author {...data.author} /> : <></>}
          </div>

          <div className="post py-10">
            <h1 className="font-bold text-4xl text-center pb-5">
              {data?.title || 'No Title'}
            </h1>

            <p className="text-gray-500 text-xl text-center">
              {data?.subtitle || 'No Subtitle'}
            </p>

            <div className="py-10">
              <Image src={data?.img || '/'} width={900} height={600} alt="" />
            </div>

            <div className="content text-gray-600 text-lg flex flex-col gap-4">
              {data?.description || 'No Description'}
            </div>
          </div>

          <Related />
        </section>
      </Format>
    </SWRConfig>
  );
}

export async function getStaticProps({ params }) {
  const posts = await getPost(params.postId);

  return {
    props: {
      fallback: {
        '/api/posts': posts,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPost();
  const paths = posts.map((value) => {
    return {
      params: {
        postId: value.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
