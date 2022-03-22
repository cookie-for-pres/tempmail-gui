import React from 'react';
import { Card, Button, Text, Title, Container, Accordion } from '@mantine/core';
import { Mailbox } from 'tabler-icons-react';
import axios from 'axios';
import moment from 'moment';

const EmailDatabase = ({ emails, setInboxMessages }: any) => {
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
      <Card withBorder shadow='sm' p='lg' m='lg' style={{ backgroundColor: 'var(--dark-100)', height: '336px', overflow: 'auto' }}>
        <Container size='xl'>
          <Text weight={600} color='white' align='center' size='xl' >
            <Title order={3}>Email Database</Title>
          </Text>
          <br />
          <br />
          <Accordion>
            {
              emails.map((email: any, index: number) => {
                return (
                  <Accordion.Item key={index} label={email.label !== '' ? email.label : email.email}>
                    <Text><strong>Email</strong>: {email.email}</Text>
                    <Text><strong>Password</strong>: {email.password}</Text>
                    <Text><strong>Date</strong>: {moment(email.date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                    <br />
                    <Button onClick={() => inbox(email.email)} variant='gradient' gradient={{ from: 'indigo', to: 'cyan' }} fullWidth rightIcon={<Mailbox />}>
                      View Inbox
                    </Button>
                  </Accordion.Item>
                );
              })
            }
          </Accordion>
        </Container>
      </Card>
    </>
  );
};

export default EmailDatabase;