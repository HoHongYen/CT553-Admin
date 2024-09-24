import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 12rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <StyledLogo onClick={() => navigate("/")}>
      <Img src={isDarkMode ? "/logo.png" : "/logo.png"} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
