import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import GoTop from "@/components/ui/GoTop";
import Header from "@/components/sidebar/Header";
import Sidebar from "@/components/sidebar/Sidebar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showGoTop, setShowGoTop] = useState(false);

  const handleVisibleButton = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);

    if (scrollPosition > 50) {
      return setShowGoTop(true);
    } else if (scrollPosition < 50) {
      return setShowGoTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  });

  const refScrollUp = useRef();

  const handleScrollUp = () => {
    refScrollUp.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <div ref={refScrollUp}> </div>
        <div className="fixed bottom-24 right-10">
          <GoTop showGoTop={showGoTop} scrollUp={handleScrollUp} />
        </div>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
