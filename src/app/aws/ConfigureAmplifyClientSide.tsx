'use client'
import { Amplify } from 'aws-amplify';
import amplifyConfig from "@/app/aws/amplify-config";


Amplify.configure(amplifyConfig, { ssr: true });



export default function ConfigureAmplifyClientSide() {
    return null;

}
