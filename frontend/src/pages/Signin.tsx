import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signin(){
    const usernameRef = useRef<HTMLElement>(null)
    const passwordRef = useRef<HTMLElement>(null)

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })
        alert("user successfully logged in!")
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8 flex flex-col gap-2">
            <Input ref={usernameRef} placeholder="Username"/>
            <Input ref={passwordRef} placeholder="Password"/>
            <div className="flex justify-center pt-2">

            <Button onClick={signin} loading={false} variant="primary" text="Signin" fullWidth={true} />
            </div>
        </div>
    </div>
}