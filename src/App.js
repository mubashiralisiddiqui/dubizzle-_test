import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import lodash from 'lodash';

import Header from "./components/Header";
import GlobalStyles from "./GlobalStyle";
import GistList from './components/GistList';
import { getGistForUser, getPublicGists } from './services/gistService';

const App = () => {
  // initializing state
  const [state, setState] = useState({
    gists: [],
    error: null,
    loading: false
  })

  // hook as Didmount
  useEffect(() => {
    fetchPubilcGist();
  }, []);

  // fetching public gist
  const fetchPubilcGist = async () => {
    try {
      setState({ ...state, loading: true });
      const response = await getPublicGists();
      if (response && response.data) {
        setState({ ...state, gists: response.data, loading: false });
        return
      }
      setState({ ...state, error: 'Something went wrong', loading: false });

    } catch (err) {
      console.log('err', err)
      setState({ ...state, error: 'Something went wrong' });
    }
  }
  // fetching gists for a specific user
  const fetchGistForUser = async (user) => {
    try {
      setState({ ...state, loading: true });
      const response = await getGistForUser(user);
      if (response && response.data) {
        setState({ ...state, gists: response.data, loading: false });
        return
      }
      setState({ ...state, error: 'Something went wrong' });

    } catch (err) {
      console.log('err', err)
      setState({ ...state, error: 'Something went wrong', loading: false });
    }
  }

  const delayedQuery = lodash.debounce(q => fetchGistForUser(q), 500);
  // input change handler
  const handleSearch = async (e) => {
    const { value } = e.target
    try {
      if (value === '') {
        fetchPubilcGist();
        return
      }
      delayedQuery(value)
    } catch (err) { console.log("err") }
  }

  const { gists, loading } = state
  return (
    <Wrapper className="App" data-testid="app">
      <Header handleSearch={handleSearch} />
      <GlobalStyles />
      {loading ? 'Loading...' : < GistList gists={gists} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;
