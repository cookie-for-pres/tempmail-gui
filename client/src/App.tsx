import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import GenerateEmail from './components/GenerateEmail';
import SaveEmail from './components/SaveEmail';
import Inbox from './components/Inbox';
import EmailDatabase from './components/EmailDatabase';

import { db } from './helpers/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function App() {
  const [saveEmailEmail, setSaveEmailEmail] = useState('');
  const [saveEmailPassword, setSaveEmailPassword] = useState('');
  const [inboxMessages, setInboxMessages] = useState([]);
  const [emailDatabase, setEmailDatabase] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'emails'), (querySnapshot: any) => {
      const emails: any = [];
      querySnapshot.forEach((doc: any) => {
        emails.push({ ...doc.data(), id: doc.id });
      });
      setEmailDatabase(emails);      
    });

    return () => {
      unsubscribe();
    }
  }, []);
  
  return (
    <>
      <Helmet>
        <style>
          {
            `body { overflow: hidden; }`
          }
        </style>
      </Helmet>
      <div className='wrapper'>
        <GenerateEmail 
          see={setSaveEmailEmail}
          sep={setSaveEmailPassword}
          se={saveEmailEmail}
          sp={saveEmailPassword}
        />

        <SaveEmail 
          email={saveEmailEmail} 
          password={saveEmailPassword} 
          setInboxMessages={setInboxMessages}
        />
      </div>
      <br />
      <div className='wrapper'>
        <Inbox 
          messages={inboxMessages} 
        />

        <EmailDatabase 
          emails={emailDatabase} 
          setInboxMessages={setInboxMessages} 
        />
      </div>
    </>
  );
};

export default App;
