import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Router from './Router';
import { AuthContextProvider } from './context/AuthContext';

function App() {

  // const [elo, setElo] = useState("");

  // useEffect(() => {
  //   axios
  //     .get('https://api.brawlhalla.com/search?steamid=76561198395701439&api_key=7RB2I47437H3TT3JYJEN')
  //     .then(res => {
  //       console.log(res);
  //       const brawlhallaId = res.data.brawlhalla_id;
        
  //       axios
  //         .get('https://api.brawlhalla.com/player/' + brawlhallaId + '/ranked?api_key=7RB2I47437H3TT3JYJEN')
  //         .then(res => {
  //           console.log(res);
  //           setElo(res.data.rating);
  //         })
  //         .catch(err => console.log(err));

  //     })
  //     .catch(err => console.log(err));
  // },[]);

  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
