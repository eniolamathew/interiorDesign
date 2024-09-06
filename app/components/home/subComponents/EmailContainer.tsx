import React from 'react';
import styled from 'styled-components';
import Input from '../../ui/emailInput/input';

interface EmailContainerProps {
  email: string;
  invalidEmail: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  invalidPassword: string;
}

const EmailContainerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  margin-top: 12px;
  justify-content: center;
`;

const EmailContainer: React.FC<EmailContainerProps> = ({
  email,
  setEmail,
  invalidEmail,
  password,
  setPassword,
  invalidPassword,
}) => {
  return (
    <EmailContainerWrapper>
        <Input
          label={"Email Address"}
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          error={invalidEmail}
        />
        <Input
          label={"Password"}
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          error={invalidPassword}
        />
    </EmailContainerWrapper>
  );
};

export default EmailContainer;