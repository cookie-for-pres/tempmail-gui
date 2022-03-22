import React from 'react';
import { Card, Text, Title, Accordion } from '@mantine/core';
import moment from 'moment';

const Inbox = ({ messages }: any) => {
  return (
    <>
      <Card withBorder shadow='sm' p='lg' m='lg' style={{ backgroundColor: 'var(--dark-100)', height: '336px', overflow: 'auto' }}>
        <Text weight={600} color='white' align='center' size='xl' >
          <Title order={3}>Inbox</Title>
        </Text>
        <br />
        <Accordion>
          {
            messages.map((message: any, index: number) => {
              return (
                <Accordion.Item key={message.id} label={message.subject !== '' ? message.subject : `No subject - ${moment(message.date).format('MMMM Do YYYY, h:mm:ss a')}` }>
                  <Text><strong>Subject</strong>: {message.subject}</Text>
                  <Text><strong>From</strong>: {message.from} </Text>
                  <Text><strong>Date</strong>: {moment(message.date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                  
                  <div dangerouslySetInnerHTML={{__html: message.body}} />
                </Accordion.Item>
              );
            })
          }
        </Accordion>
      </Card>
    </>
  );
};

export default Inbox;