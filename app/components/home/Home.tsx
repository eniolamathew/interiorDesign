"use client"
import React, { ChangeEvent, useState } from 'react';
import {
    HomeWrapper,
    HomeContainer,
    ContentWrapper,
    MaxWidth,
    HomeContent,
    Text1,
    Text2,
    Text3,
    Text4,
} from './HomeStyles';
import EmailContainer from './subComponents/EmailContainer';
import ButtonContainer from '../ui/buttons/ButtonContainer';
import backgroundImage from "../../../public/asset/backgroundImage.jpg";
import InputContainer from '../ui/input/InputContainer';
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState<string>("");
  const [invalidEmail, setInvalidEmail] = useState<string>("");
  const [invalidPassword, setInvalidPassword] = useState<string>("");

//   function addEmail(emailType, email) {
//     let emailRegex  = /^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])$/
//     if (!emailRegex.test(email)) {
//         errors[emailType] = 'Please Enter a Valid Email Address';
//         setErrors({ ...errors });
//         supplier[emailType] = supplier[emailType].replace(email, "");
//         return;
//     }
//     if(checkForDuplicateEmail(supplier[emailType], email)){
//         errors[emailType] = "Duplicate Email Address";
//         setErrors({ ...errors });
//         const newString = removeDuplicateSubstring(supplier[emailType])
//         supplier[emailType] = newString;
//         return;
//     }else{
//         supplier[emailType] = supplier[emailType] + ';';
//     }

//     let noError = {};
//     setErrors(noError);
//     setSupplier({ ...supplier });
// }

  const validateEmail =()=> {
    let emailRegex  = /^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])$/
    if(email.length === 0){
      setInvalidEmail("Please Enter a Valid Email Address")
    }
    else if (!emailRegex.test(email)) {
      setInvalidEmail("Please Enter a Valid Email Address")
    }
    else{
      router.push(`/signup?email=${email}`);

      // router.push("/signup")
    }
  }

  return (
    <HomeWrapper>
      <HomeContainer background={backgroundImage.src}>
        <ContentWrapper>
          <MaxWidth>
            <HomeContent>
              <Text1>Transform your interior design in seconds with AI.</Text1>
              <Text2>Create your dream space effortlessly, using <span>AI</span></Text2>
              <Text3>Starts at £1.99. Cancel at any time.</Text3>
              <Text4>Ready to create? Enter your email to signup or restart your membership.</Text4>
       
              <div style={{ display: "flex", alignItems:"flex-start", justifyContent:"center", marginTop:"1rem" }}>
                <div style={{ width: "32rem" }}>
                  <InputContainer
                        label={"Email Address"}
                        value={email}
                        obscureText={false}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>{ 
                          setEmail(e.target.value)
                          setInvalidEmail("")
                        }}
                        error={invalidEmail}
                    />
                </div>
                <div style={{ width: "32rem" }}>
                  <ButtonContainer 
                      text={"Get Started"}
                      icon={true}
                      onClick={(e)=>{ e.preventDefault()
                        validateEmail()
                      }}
                  />
              </div>
              </div>
            </HomeContent>
          </MaxWidth>
        </ContentWrapper>
      </HomeContainer>
    </HomeWrapper>
  );
}
