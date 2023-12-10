import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      author {
        id
        name
      }
    }
    post(id:1){
      title
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={{fontSize: 10}}>{JSON.stringify(data)}</div>
      </header>
    </div>
  );
}

export default App;
