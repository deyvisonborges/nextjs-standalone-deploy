import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Repo = {
  name: string;
  stargazers_count: number;
};

export const getServerSideProps = (async (context) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const repo = await res.json();
  return { props: { repo } };
}) satisfies GetServerSideProps<{
  repo: Repo;
}>;

export default function Page({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ul>
      <li>{repo.name}</li>
      <li>{repo.stargazers_count}</li>
      <li>{Date.now()}</li>
    </ul>
  );
}
