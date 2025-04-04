import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import Heading from "@/components/ui/Heading";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

function PageNotFound() {
  const navigate = useNavigate();
  
  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">Trang bạn tìm kiếm không tồn tại! 😢</Heading>
        <button onClick={() => navigate("/")} size="large">
          &larr; Quay về trang chủ
        </button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
