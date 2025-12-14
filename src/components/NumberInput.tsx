import {useState, useEffect, ChangeEvent, useRef} from 'react';
import { TextField, Button, Card, Collection, Heading, Flex } from '@aws-amplify/ui-react';

type NumberInputProps = {
    id: string;
    label: string;
    onChange: (value: number) => void;
};


export default function NumberInput(props: NumberInputProps) {

    const value = useRef(0);

    const inputRef = useRef<HTMLInputElement>(null);

    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(+inputRef.current!.value);
    }

    const increment = () => {
        console.log("increment");
        value.current += 1;
        inputRef.current!.value = String(+inputRef.current!.value + 1);
        props.onChange(+inputRef.current!.value);
    }

    const decrement = () => {
        value.current -= 1;
        inputRef.current!.value = String(+inputRef.current!.value - 1);
        props.onChange(+inputRef.current!.value);
    }


    return (
        <div className={"w-full relative px-5"}>
            <div
                className="py-2 px-3 flex gap-x-5 justify-between items-center relative
            w-full max-w-100 bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700">
                <div>{props.label}</div>
                <div className="flex items-center gap-x-5">
                    <button type="button" onClick={decrement}
                            className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                            aria-label="Decrease">
                        <svg className="shrink-0 size-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                        </svg>
                    </button>
                    <input ref={inputRef} inputMode={"numeric"} className={"w-12"} defaultValue={0} onChange={changeValue} />
                    {/*<div>{value.current}</div>*/}
                    <button type="button" onClick={increment}
                            className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                            aria-label="Increase">
                        <svg className="shrink-0 size-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    // <>
    //     <label htmlFor={props.id}>{props.label}</label>
    //     <input id={props.id} type={"number"} onChange={changeValue}></input>
    // </>
)
    ;
}