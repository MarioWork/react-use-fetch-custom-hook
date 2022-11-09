import useFetch from "./hooks/use-fetch";

function App() {
  const url = `http://jsonplaceholder.typicode.com/posts`;
  const { isLoading, data, error } = useFetch(url);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>There was an error...</h1>;
  }

  return (
    <div>
      {data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

export default App;
