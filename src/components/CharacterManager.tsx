"use client"
import { useState, useEffect } from 'react';
import { TextField, Button, Card, Collection, Heading, Flex } from '@aws-amplify/ui-react';

// Define a type for our character data for type safety
type Character = {
    id: string;
    name: string;
    hitPoints: number;
    armorClass: number;
};

export default function CharacterManager() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [name, setName] = useState('');
    const [hp, setHp] = useState('');
    const [ac, setAc] = useState('');

    // Function to fetch characters from our API
    const fetchCharacters = async () => {
        try {
            const response = await fetch('/api/characters');
            if (!response.ok) {
                throw new Error('Failed to fetch characters');
            }
            const data = await response.json();
            setCharacters(data);
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect runs this function once when the component loads
    useEffect(() => {
        fetchCharacters();
    }, []);

    // Function to handle form submission
    const handleCreateCharacter = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/characters', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    hitPoints: parseInt(hp),
                    armorClass: parseInt(ac),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create character');
            }

            // Clear the form and refresh the list
            setName('');
            setHp('');
            setAc('');
            fetchCharacters();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Flex direction="column" gap="large">
            <Card as="form" onSubmit={handleCreateCharacter} variation="elevated">
                <Flex direction="column" gap="medium">
                    <Heading level={3}>Create New Character</Heading>
                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} isRequired />
                    <TextField label="Hit Points" value={hp} onChange={(e) => setHp(e.target.value)} type="number" isRequired />
                    <TextField label="Armor Class" value={ac} onChange={(e) => setAc(e.target.value)} type="number" isRequired />
                    <Button type="submit" variation="primary">Create</Button>
                </Flex>
            </Card>

            <Heading level={3}>Your Characters</Heading>
            <Collection
                type="list"
                items={characters}
                gap="small"
                searchNoResultsFound={
                    <Heading level={5} textAlign="center" color="gray.500">
                        No characters found. Create one above!
                    </Heading>
                }
            >
                {(item, index) => (
                    <Card key={index} variation="outlined">
                        <Heading level={5}>{item.name}</Heading>
                        <p>HP: {item.hitPoints} | AC: {item.armorClass}</p>
                    </Card>
                )}
            </Collection>
        </Flex>
    );
}