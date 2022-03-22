import React, { useState, useEffect } from 'react';
import { Card, Button, Text, Title, Container, Input, PasswordInput, Tooltip, Notification } from '@mantine/core';
import { At, Lock, AlertCircle, CloudUpload, CursorText, Mailbox } from 'tabler-icons-react';
import axios from 'axios';

import { db } from '../helpers/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const SaveEmail = ({ email: e_, password: p_, setInboxMessages }: any) => {
  const [label, setLabel] = useState('');
  const [email, setEmail] = useState(e_);
  const [password, setPassword] = useState(p_);
  const [alert, setAlert] = useState({ showing: false, message: '', color: '' });

  useEffect(() => {
    setEmail(e_);
    setPassword(p_);
  }, [e_, p_]);

  const save = () => {
    if (!email) {
      setAlert({ showing: true, message: 'Email is required!', color: 'red' });
      setTimeout(() => {
        setAlert({ showing: false, message: '', color: '' });
      }, 3000);
      return;
    }

    try {
      const doc = { label, email, password, timestamp: serverTimestamp() };
      addDoc(collection(db, 'emails'), doc);    

      setAlert({ showing: true, message: 'Email saved successfully!', color: 'green' });

      setTimeout(() => {
        setAlert({ showing: false, message: '', color: '' });
      }, 3000);

      setEmail('');
      setPassword('');
    } catch(err: any) {
      const error = err.message;
      setAlert({ showing: true, message: error, color: 'red' });

      setTimeout(() => {
        setAlert({ showing: false, message: '', color: '' });
      }, 3000);
    }
  };

  const inbox = async(email: string) => {
    const baseUrl = 'https://www.1secmail.com/api/v1/';

    let params = `?action=getMessages&login=${email.split('@')[0]}&domain=${email.split('@')[1]}`;
    let url = baseUrl + params;
    let messages: any = [];

    const data = await axios.get(url);
    data.data.forEach(async (hm: any) => {
      params = `?action=readMessage&login=${email.split('@')[0]}&domain=${email.split('@')[1]}&id=${hm.id}`;
      url = baseUrl + params;

      const data = await axios.get(url);
      messages.push(data.data);

      setInboxMessages(messages);
    });
  };
  
  return (
    <>
      {
        alert.showing && (
          <>
            <Notification style={{ position: 'absolute', right: 10, zIndex: 10, width: '3in' }} color={alert.color} onClose={() => {
              setAlert({ showing: false, message: '', color: '' });
            }}>
              {alert.message}
            </Notification>
          </> 
        )
      }

      <Card withBorder shadow='sm' p='lg' m='lg' style={{ backgroundColor: 'var(--dark-100)', maxHeight: '336px', height: '100%' }}>
        <Container size='xl'>
          <Text weight={600} color='white' align='center' size='xl' >
            <Title order={3}>Save Email</Title>
          </Text>
          <br />
          <br />
          <Input icon={<CursorText />} placeholder='Label' value={label} onChange={(e: any) => setLabel(e.value)} rightSection={
            <Tooltip label="This label isn't required." position='top' placement='end'>
              <AlertCircle size={16} style={{ display: 'block', opacity: 0.5 }} />
            </Tooltip>
          } />
          <br />
          <Input icon={<At />} placeholder='Email' value={email} onChange={(e: any) => setEmail(e.value)} required />
          <br />
          <PasswordInput icon={<Lock />} placeholder='Password' value={password} onChange={(e: any) => setPassword(e.value)} required />
          <br />
          <br />
          <div className='wrapper' style={{ gap: '23px' }}>
            <Button rightIcon={<CloudUpload />} onClick={save} fullWidth variant='gradient' gradient={{ from: 'indigo', to: 'cyan' }}>
              Save Email 
            </Button>
            <Button rightIcon={<Mailbox />} onClick={() => inbox(email)} fullWidth variant='gradient' gradient={{ from: 'indigo', to: 'cyan' }}>
              View Inbox
            </Button>
          </div>
        </Container>
      </Card>
    </>
  );
};

export default SaveEmail;