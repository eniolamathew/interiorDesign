"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../ui/buttons/button/button";
import { useRouter } from "next/navigation";

// Styled component for the Navbar container
const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  transition: background-color 0.3s ease; 
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  z-index: 1000;
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Navbar = () => {
  const router = useRouter();
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    const navConatainer = document.querySelector(".navConatainer")!;
    const navConatainerRect = navConatainer?.getBoundingClientRect();
    if (scrollY > window.innerHeight * 0.15) {
      navConatainer.classList.add("backgroundColor");
    } else {
      navConatainer.classList.remove("backgroundColor");
    }
  }, [scrollY]);

  return (
    <NavbarContainer id="navConatainer" className="navConatainer">
      <NavItems>
        <NavItem>Logo</NavItem>
        <NavItem>Home</NavItem>
        <NavItem>About</NavItem>
        <NavItem>Services</NavItem>
        <NavItem>Contact</NavItem>
        <NavItem>
          <Button onClick={(e) => {
              e.preventDefault();
              router.push("/login");
            }}
          > Sign In
          </Button>
        </NavItem>
      </NavItems>
    </NavbarContainer>
  );
};

export default Navbar;
