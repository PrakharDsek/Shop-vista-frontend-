import { motion } from "framer-motion";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <Content>
        <Logo>
          <Heading>Shop Vista</Heading>
        </Logo>
        <TermsAndConditions>
          Terms and Conditions By accessing and using the ShopVista website
          (Shopvista.xyz), you agree to be bound by the following terms and
          conditions: General: The Website and its content are provided for
          informational purposes only. The information is subject to change
          without notice. The use of any information or materials on the Website
          is entirely at your own risk. It is your responsibility to ensure that
          any products, services, or information available through this Website
          meet your specific requirements. Intellectual Property: This Website
          contains material which is owned by or licensed to us. This material
          includes, but is not limited to, the design, layout, look, appearance,
          and graphics. Reproduction is prohibited without prior written
          consent. All trademarks reproduced on this Website, which are not the
          property of, or licensed to the operator, are acknowledged on the
          Website. External Links: This Website may include links to other
          websites. These links are provided for your convenience to provide
          further information. They do not signify that we endorse the
          Shopvista.xyz. We have no responsibility for the content of the linked
          Shopvista.xyz. Privacy Policy: We are committed to protecting your
          privacy. Our Privacy Policy governs the collection, use, and
          disclosure of your personal information. By using this Website, you
          consent to the processing of your personal information as described in
          our Privacy Policy. Limitation of Liability: In no event shall
          ShopVista or its affiliates be liable for any direct, indirect,
          incidental, special, or consequential damages arising out of or in any
          way connected with the use of this Website or the information,
          products, or services provided. Governing Law: Your use of this
          Website and any dispute arising out of such use is subject to the laws
          of [India] without regard to its conflict of law provisions. Changes
          to the Terms and Conditions: ShopVista may revise these terms and
          conditions at any time without notice. By using this Website, you are
          agreeing to be bound by the current version of these terms and
          conditions.
        </TermsAndConditions>
        <CopyRight>©2023-2050 ShopVista. All rights reserved.</CopyRight>
      </Content>
    </Container>
  );
};

export default Footer;

const Container = styled(motion.div)`
  width: 100%;
  height: 30%;
  margin: 0;
  background-color: var(--header_bg);
  @media (max-width:460px) {
    width:100%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  color: #fff;
  font-size: 0.9rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  margin: 0;
  letter-spacing: 2px;
`;

const TermsAndConditions = styled.p`
  font-size: 0.8rem;
  line-height: 1.4;
  margin: 1.5rem 0;
`;

const CopyRight = styled.h4`
  font-size: 0.8rem;
  margin: 0;
  opacity: 0.7;
`;
