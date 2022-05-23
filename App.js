import logo from './logo.svg';
import {useEffect, useState} from "react";
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
    const [avatarURL, setAvatarURL]=useState();
    const [githubUsername, setGitHubUsername]=useState();
    const [repoData, setRepodata]=useState();

    async function repoDataURL()
    {
        //Get repo data about ithub user
        await fetch("https://api.github.com/users/octocat/repos")
        .then((res)=>res.json())
        .then(
            (result)=>{
                console.log(36, result);
                const list=result.map((item)=>(
                    <div className="text-center">
                        <a target="_blank" href={item.svn_url}>
            {item.name}
            </a>
            </div>
                    ));
                    setRepodata(list);
        },
        (error)=>{
            console.log(error);
        }
    );
    }

    useEffect(()=>{
        // console.log(10);
        fetch("https://api.github.com/users/octocat")
        .then((res)=>res.json())
        .then(
        (result)=>{
            console.log(result);
            setAvatarURL(result.avatar_url);
            setGitHubUsername(result.login);
        },
        (error)=>{
            console.log(error);
        }
        );
    }, []);
  return (
    <div className="App w-100 min-vh-100 justify-content-center align-items-center d-flex flex-column">
      <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={avatarURL} />
          <Card.Body>
            <Card.Title>{githubUsername}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
        the card's content.
        </Card.Text>
        <Button variant="primary" onClick={repoDataURL}>List my public repos!</Button>
        </Card.Body>
        </Card>
        {repoData}
    </div>
  );
}

export default App;
