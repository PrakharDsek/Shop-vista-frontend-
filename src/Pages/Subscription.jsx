import styled from "styled-components";
import axios from "axios"
import {useSelector} from "react-redux"
import {toast} from "react-hot-toast"
import {useNavigate} from "react-router-dom"
const Subscription = ({BackendURL}) => {
  const {UserAuthData} =useSelector((state) => state.Auth)
  const navigate=useNavigate()
  const handleSubscription=async() => {
    try {
      const subscribe = await axios.post(
        `${BackendURL}/payments/free/subscription`,
        {
          userId: UserAuthData.data._id,
        }
      );
      navigate("/")
      toast.success("Purchased subscription")
    } catch (error) {
      toast.error("An error occured")
    }
  }
  return ( 
    <Container>
      <Content>
        <Heading>Shop Vista Subscription</Heading>
        <Advantages>
          <SmallHeading>Advantages of Subscription:</SmallHeading>
          <Para>
            1. Faster Delivery: As a subscriber to Shop Vista, you gain the
            advantage of expedited delivery services. Your orders will be
            delivered up to 50% faster than non-subscribers, ensuring you
            receive your products promptly.
          </Para>
          <Para>
            2. Exclusive Seller Benefits: If you decide to become a seller on
            Shop Vista, subscribing to the platform offers you additional
            advantages. At the end of each month, you will receive an extra cash
            payout on top of your regular earnings. This bonus serves as a
            reward for being an active seller and contributes to your overall
            income.
          </Para>
          <Para>
            3. Reduced Commission: Shop Vista recognizes the value and
            contribution of its subscribers who choose to sell products through
            their platform. As a subscriber-seller, you benefit from a reduced
            commission rate. Instead of the standard 24% deduction from your
            profits, only 15% will be deducted. This allows you to retain a
            larger portion of your earnings and increase your profitability.
          </Para>
          <Para>
            4. Enhanced Shopping Experience: Subscribing to Shop Vista elevates
            your shopping experience with exclusive features. You gain access to
            personalized recommendations based on your browsing and purchase
            history, making it easier to discover products that align with your
            preferences. Additionally, you may receive early access to flash
            sales, exclusive discounts, and promotions, enabling you to secure
            great deals before non-subscribers.
          </Para>
          <Para>
            5. Priority Customer Support: Shop Vista values its subscribers and
            provides dedicated customer support to address any queries or
            concerns you may have. As a subscriber, you receive priority
            assistance, ensuring your issues are promptly resolved and enhancing
            your overall satisfaction with the platform.
          </Para>
          <Para>
            6. Streamlined Shopping Process: With a Shop Vista subscription, you
            enjoy a streamlined shopping process. Subscribers can save their
            payment details securely, making future transactions faster and more
            convenient. This eliminates the need to enter payment information
            repeatedly, saving you time and effort during the checkout process.
          </Para>
          <Para>
            7. Exclusive Product Launches: Subscribers to Shop Vista have the
            advantage of accessing exclusive product launches before they become
            available to the general public. You can be among the first to
            discover and own the latest products, giving you a competitive edge
            in staying ahead of trends and accessing limited-edition items.
          </Para>
          <Para>
            8. Flexibility and Convenience: Subscribing to Shop Vista offers you
            flexibility and convenience in managing your shopping and selling
            activities. You can easily track your orders, manage your listings,
            and monitor your sales performance through a user-friendly
            dashboard. This centralized platform simplifies your experience and
            enables you to efficiently navigate the various aspects of online
            commerce.
          </Para>
        </Advantages>
        <TermAndCondition>Terms and Conditions:</TermAndCondition>
        <Para>
          By subscribing to Shop Vista, you agree to the following terms and
          conditions:
        </Para>
        <Para>
          1. Subscription Fee: The Shop Vista subscription requires a monthly
          fee, which will be automatically deducted from your preferred payment
          method.
        </Para>
        <Para>
          2. Faster Delivery: The faster delivery advantage applies to eligible
          products and may vary depending on the location and availability of
          the items.
        </Para>
        <Para>
          3. Seller Benefits: To receive the additional cash payout as a seller,
          you must meet the specified criteria set by Shop Vista, including
          minimum sales targets and compliance with the platform's policies.
        </Para>
        <Para>
          4. Reduced Commission: As a subscriber-seller, the reduced commission
          rate of 15% will only be applicable to eligible transactions and
          products specified by Shop Vista.
        </Para>
        <Para>
          5. Personal Data: Shop Vista will handle your personal data in
          accordance with its privacy policy to provide the subscription
          benefits and improve the overall user experience.
        </Para>
        <Para>
          6. Cancellation and Refunds: You can cancel your Shop Vista
          subscription at any time. Refunds will be subject to the refund policy
          specified by Shop Vista.
        </Para>
        <Para>
          7. Modifications: Shop Vista reserves the right to modify or terminate
          the subscription benefits, terms, and conditions at its discretion.
          Notice will be provided to subscribers regarding any significant
          changes.
        </Para>
        <Para>
          By subscribing to Shop Vista, you acknowledge that you have read,
          understood, and agreed to these terms and conditions.
        </Para>
        <Button onClick={handleSubscription}>Subscribe Now</Button>
      </Content>
    </Container>
  );
};

export default Subscription;

const Container = styled.div`
    width:100%;
    height:100%;
`;
const Content = styled.div`
    width:80%;
    height:100%;
    margin:4rem;
    
`;
const Heading = styled.h1`
    color:black;
    text-align: center;

    font-weight: 500;
`;
const Advantages = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Para = styled.p`
    color:black;
`;
const Button = styled.button`
  width: 100%;
  height: 20%;
  padding: 12px;
  background-color: var(--header_bg);
  outline:none;
  border: 1px solid rgba(0,0,0,0.25);
  border-radius:4px;
  cursor:pointer;
`;
const TermAndCondition = styled.h3`
    color:black;
`;
const SmallHeading = styled.h3`
    color:black;
`;
