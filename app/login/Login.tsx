"use client";
import React, { ChangeEvent, useState } from "react";
import {
  LoginWrapper,
  MaxWidth,
  LoginContainer,
  LoginContent,
  Text1,
  Text2,
  Text3,
  Text4,
} from "./LoginStyles";
import InputContainer from "../components/ui/input/InputContainer";
import ButtonContainer from "../components/ui/buttons/ButtonContainer";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalidEmail, setInvalidEmail] = useState<string>("");
  const [invalidPassword, setInvalidPassword] = useState<string>("");

  const validateData = ()=>{
    if(email.length === 0){
        setInvalidEmail("Please provide a valid Email")
    }
    if(password.length === 0){
        setInvalidEmail("Please provide a valid Password")
    }
  }

  return (
    <LoginWrapper>
      <LoginContainer>
        <MaxWidth>
          <LoginContent>
            <Text1>Sign In</Text1>
            <div className="mb-2">
                <InputContainer
                    label={"Email Address"}
                    value={email}
                    obscureText={false}
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>{ setEmail(e.target.value)}}
                    error={invalidEmail}
                />
            </div>
            <div className="mb-2">
                <InputContainer
                    label={"Password"}
                    value={password}
                    obscureText={true}
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>{ setPassword(e.target.value)}}
                    error={invalidPassword}
                />
            </div>      
            <ButtonContainer
              icon={false}
              text={"Sign In"}
              onClick={(e) => {
                e.preventDefault();

              }}
            />
            <div className="mt-4">
                <Link href="#">Forgot Password?</Link>
            </div>
            <div className="mt-4">
                <span style={{color:"#acacac"}}>New to us? </span>
                <Link href="/signup">Sign up now.</Link>
            </div>
          </LoginContent>
        </MaxWidth>
      </LoginContainer>
    </LoginWrapper>
  );
}           