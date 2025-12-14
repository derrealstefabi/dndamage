import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    PutCommand,
    QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import {createServerRunner} from "@aws-amplify/adapter-nextjs";
import amplifyConfig from "@/app/aws/amplify-config";
import {cookies} from "next/headers";

const client = new DynamoDBClient({ region: process.env.NEXT_PUBLIC_AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.DYNAMODB_TABLE || 'dndamage-characters';
/**
 * The `runWithAmplifyServerContext` helper function is created by `createServerRunner`.
 * It wraps your server-side logic (like API handlers or data fetching functions)
 * and provides them with an Amplify context. This context is essential for making
 * authenticated requests on the server, such as getting the current user.
 */
const { runWithAmplifyServerContext } = createServerRunner(
    {config: amplifyConfig}
);

/**
 * Handles GET requests to fetch characters for the authenticated user.
 */
export async function GET(request: NextRequest) {
    return runWithAmplifyServerContext({
        nextServerContext: { cookies },
        async operation(contextSpec) {
            try {
                // The wrapper provides the context to securely get the current user.
                const user = await getCurrentUser(contextSpec);
                const command = new QueryCommand({
                    TableName: tableName,
                    IndexName: 'byOwner',
                    KeyConditionExpression: 'ownerId = :ownerId',
                    ExpressionAttributeValues: { ':ownerId': user.userId },
                });

                const { Items } = await docClient.send(command);
                return NextResponse.json(Items || []);
            } catch (error) {
                console.error('GET /api/characters error:', error);
                // If getCurrentUser fails, it throws an error, so unauthenticated
                // users will not be able to proceed.
                return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
            }
        },
    });
}

/**
 * Handles POST requests to create a new character for the authenticated user.
 */
export async function POST(request: NextRequest) {
    return runWithAmplifyServerContext({
        nextServerContext: { cookies },
        async operation(contextSpec) {
            try {
                const user = await getCurrentUser(contextSpec);
                const { name, hitPoints, armorClass } = await request.json();
                const characterId = uuidv4();

                const command = new PutCommand({
                    TableName: tableName,
                    Item: { id: characterId, ownerId: user.userId, name, hitPoints, armorClass },
                });

                await docClient.send(command);
                return NextResponse.json({ status: 201 });
            } catch (error) {
                console.error('POST /api/characters error:', error);
                return new NextResponse(JSON.stringify({ message: 'Unauthorized or invalid data' }), { status: 401 });
            }
        },
    });
}

