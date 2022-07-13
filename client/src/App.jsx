import React from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelListContainer, ChannelContainer, Auth } from './containers'

import './App.css'

const cookies = new Cookies();

const apiKey = 'wncu7whfq2dy';
//const apiSecret = '7na99kyh53gmm3m9pnvf9mr9twrssvh8ncp989jnetx7g6zpd27wf6hcqtu458wm';
const authToken=cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken){
  client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
  },authToken)
}

const App = () => {

  if(!authToken){
    return <Auth />
  }

  return (
    <div className='app__wrapper'>
        <Chat client={client} theme="team light">
              <ChannelListContainer />
              <ChannelContainer />
        </Chat>
    </div>
  )
}

export default App