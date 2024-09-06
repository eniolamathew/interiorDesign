"use client";
import React, { ChangeEvent, useState } from "react";
import {
  SignupWrapper,
  MaxWidth,
  SignupContainer,
  SignupContent,
  Text1,
} from "./SignupStyles";
import InputContainer from "../components/ui/input/InputContainer";
import ButtonContainer from "../components/ui/buttons/ButtonContainer";
import Link from "next/link";
import styled from "styled-components";
import { useSearchParams } from 'next/navigation';

const Terms = styled.div`
  text-align: start;
  font-size: 0.8rem;
  color: #acacac;

  span {
    color: #007BFF;
  }
`;

export default function Signup() {
  const searchParams = useSearchParams();
  const emailParams = searchParams.get('email'); 
  const [terms, setTerms] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(emailParams ? emailParams : "");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
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
    <SignupWrapper>
      <SignupContainer>
        <MaxWidth>
          <SignupContent>
            <Text1>Sign Up</Text1>
            <div className="mb-2">
              <InputContainer
                label={"Email Address"}
                value={email}
                obscureText={false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
                error={invalidEmail}
              />
            </div>
            <div className="mb-2">
              <InputContainer
                label={"Password"}
                value={password}
                obscureText={true}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value)}}
                error={invalidPassword}
                />
            </div>
            <div className="mb-2">
              <InputContainer
                label={"Confirm Password"}
                value={confirmPassword}
                obscureText={true}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { setConfirmPassword(e.target.value) }}
              />
            </div>
            <div className="mt-4">
              <Terms style={{ color: "#acacac" }}>By Signing the account, you accept out <span >Terms & condtion</span> and <span>Privacy Policy</span></Terms>
            </div>
            <ButtonContainer
              icon={false}
              text={"Sign Up"}
              onClick={(e) => {
                e.preventDefault();
              }}
            />
            <div className="mt-4">
              <Link href="#">Forgot Password?</Link>
            </div>
            <div className="mt-4">
              <span style={{ color: "#acacac" }}>Have an account? </span>
              <Link href="/login">Sign in now.</Link>
            </div>
          </SignupContent>
        </MaxWidth>
      </SignupContainer>
    </SignupWrapper>
  );
}
