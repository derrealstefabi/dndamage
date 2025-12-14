"use client"
import { Authenticator, useAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import CharacterManager from '../components/CharacterManager';
import NumberInput from "@/components/NumberInput";
import {useEffect, useState} from "react"; // We will create this next

// The component that renders when a user is signed in
function AuthenticatedApp() {
  // The useAuthenticator hook provides user data and a signOut function
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
      <div>
        <Heading level={1}>Welcome, {user.username}</Heading>
        <CharacterManager />
        <Button onClick={signOut} variation="primary" isFullWidth={true} marginTop="20px">
          Sign Out
        </Button>
      </div>
  );
}


// The component that renders when a user is signed in
function calculateDamage() {
  // The useAuthenticator hook provides user data and a signOut function
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
      <div>
        <Heading level={1}>Welcome, {user.username}</Heading>
        <CharacterManager />
        <Button onClick={signOut} variation="primary" isFullWidth={true} marginTop="20px">
          Sign Out
        </Button>
      </div>
  );
}



// The main export for your page
export default function Home() {
    const [offensivBonus, setOffensivBonus] = useState(0);
    const [waffenSchaden, setWaffenSchaden] = useState(0);
    const [reichweitenMalus, setReichweitenMalus] = useState(0);
    const [diceRoll, setDiceRoll] = useState(0);
    const [ruestung, setRuestung] = useState(0);
    const [defensivBonus, setDefensivBonus] = useState(0);
    const [hit, setHit] = useState(false);
    const [damage, setDamage] = useState(0);

    useEffect(() => {
        let dmg = offensivBonus + diceRoll + reichweitenMalus;
        let def = ruestung + defensivBonus;
        setHit(dmg > def);

        if (hit) {
            let actualDmg = offensivBonus + diceRoll + reichweitenMalus + waffenSchaden;
            if (diceRoll >= 20) {
                actualDmg += waffenSchaden;
            }
            setDamage(actualDmg - def);
        } else {
            setDamage(0);
        }
    }, [offensivBonus, waffenSchaden, diceRoll, reichweitenMalus, ruestung, defensivBonus]);

  return (
      <div className={"h-screen"}>
          <div
              className="px-5 pt-10 flex items-center text-lg text-gray-800
              before:flex-1 before:border-t-3 before:border-gray-200 before:me-6
              after:flex-1 after:border-t-3 after:border-gray-200 after:ms-6
              dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
              Angreifer
          </div>
          <div className={"pt-2"}><NumberInput id={"ws"} label={"Waffenschaden"} onChange={setWaffenSchaden}/></div>
          <div className="pt-3"><NumberInput id={"KBo"} label={"Offensivbonus"} onChange={setOffensivBonus}/></div>
          <div className="pt-3"><NumberInput id={"rwm"} label={"Reichweitenmalus"} onChange={setReichweitenMalus}/></div>
          <div className="pt-3"><NumberInput id={"dten"} label={"D10"} onChange={setDiceRoll}/></div>
          <div
              className="px-5 pt-10 flex items-center text-lg text-gray-800
              before:flex-1 before:border-t-3 before:border-gray-200 before:me-6
              after:flex-1 after:border-t-3 after:border-gray-200 after:ms-6
              dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
              Verteidiger
          </div>
          <div className="pt-2"><NumberInput id={"rst"} label={"Rüstung"} onChange={setRuestung}/></div>
          <div className="pt-3"><NumberInput id={"kbDef"} label={"Defensivbonus"} onChange={setDefensivBonus}/></div>

          <div
              className="px-5 pt-10 flex items-center text-lg text-gray-800
              before:flex-1 before:border-t-3 before:border-gray-200 before:me-6
              after:flex-1 after:border-t-3 after:border-gray-200 after:ms-6
              dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
              Schaden
          </div>
          <div className="w-full m-auto px-5 pt-5">
              <div
                  className="py-2 px-3 flex gap-x-5 justify-between items-center relative
            w-full max-w-100 bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700">
                  {hit && <div>HIT!</div>}
                  {!hit && <div>Kein Treffer :(</div>}
              </div>
          </div>
          <div className="w-full relative px-5 pt-5">
              <div
                  className="py-2 px-3 flex gap-x-5 justify-between items-center relative
            w-full max-w-100 bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700">
                  <div>Schaden</div>
                  <div>{damage}</div>
              </div>
          </div>
      </div>

      // <Authenticator
      //     // As before, we only configure the 'signIn' fields
      //     // to hide the "Create Account" option.
      //     formFields={{
      //       signIn: {
      //         username: {
      //           placeholder: 'Enter your email',
      //         },
      //       },
      //     }}
      // >
      // </Authenticator>
  );
}
