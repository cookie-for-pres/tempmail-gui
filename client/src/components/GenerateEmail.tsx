import React, { useState } from 'react';
import { Card, Button, Text, Title, Input, Container, Tooltip } from '@mantine/core';
import { At, Lock, Mail, CloudUpload, AlertCircle } from 'tabler-icons-react';
import axios from 'axios';

const GenerateEmail = ({ see, sep, se, sp }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    
    const baseUrl = 'https://www.1secmail.com/api/v1/';
    const params = '?action=genRandomMailbox&count=1';
    const url = baseUrl + params;

    const data = await axios.get(url);
    const email = data.data[0];
    const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    setLoading(false);
    setEmail(email);
    setPassword(password);
  };

  const bringToSave = () => {
    see(email);
    sep(password);
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Card withBorder shadow='sm' p='lg' m='lg' style={{ backgroundColor: 'var(--dark-100)', maxHeight: '336px', height: '100%' }}>
        <Container size='xl'>
          <Text weight={600} color='white' align='center' size='xl' >
            <Title order={3}>
              Generate Email
            </Title>
          </Text>
          <br />
          <br />
          <Input icon={<At />} placeholder='Generated Email' value={email} onChange={(e: any) => setEmail(e.value)} />
          <br />
          <Input icon={<Lock />} placeholder='Generated Password' value={password} onChange={(e: any) => setPassword(e.value)} rightSection={
            <Tooltip label='This password is not for the email its just randomly generated.' position='top' placement='end'>
              <AlertCircle size={16} style={{ display: 'block', opacity: 0.5 }} />
            </Tooltip>
          } />
          <br />
          <br />
          <br />
          <br />
          <br />
          {
            loading ? (
              <>
                <div className='wrapper' style={{ gap: '23px', marginTop: '5px' }}>
                  <Button rightIcon={<Mail />} loading onClick={generate} fullWidth variant='gradient' gradient={{ from: 'indigo', to: 'cyan' }}>
                    Generate New Email
                  </Button>
                  <Button rightIcon={<CloudUpload />} loading onClick={generate} fullWidth variant='gradient' gradient={{ from: 'indigo', to: 'cyan' }}>
                    Bring to Save
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className='wrapper' style={{ gap: '23px', marginTop: '5px' }}>
                  <Button rightIcon={<Mail />} onClick={generate} fullWidth variant='gradient' gradient={{ from: 'indigo', to: 'cyan' }}>
                    Generate New Email
                  </Button>
                  <Button rightIcon={<CloudUpload />} onClick={bringToSave} fullWidth variant='gradient' gradient={{ from: 'indigo', to: 'cyan' }}>
                    Bring to Save
                  </Button>
                </div>
              </>
            )
          }
          <br />
        </Container>
      </Card>
    </>
  );
};

export default GenerateEmail;