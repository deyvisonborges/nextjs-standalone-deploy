function Blog({ ...props }) {
  return (
    <ul>
      {props.jokes.jokes.map((joke: any) => (
        <li key={joke.id}>{joke.category}</li>
      ))}
    </ul>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch("https://v2.jokeapi.dev/joke/Any?amount=2");
  const jokes = await res.json();

  return {
    props: {
      jokes,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export default Blog;
