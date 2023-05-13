import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { UserAuthProvider } from "@/context/authContext";
import { ChatProvider } from "@/context/chatContext";
import TeamFormProvider from "@/context/forms/productformContext";
import UserProvider from "@/context/userContext";
import AcceptRejectButtonProvider from "@/context/utils/AcceptRejectButtonContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <UserAuthProvider>
      <UserProvider>
        <ChatProvider>
          <TeamFormProvider>
            <AcceptRejectButtonProvider>
              <div className="max-w-6xl mx-auto">
                <Header />
                <Component {...pageProps} />
                <Footer/>
              </div>
            </AcceptRejectButtonProvider>
          </TeamFormProvider>
        </ChatProvider>
      </UserProvider>
    </UserAuthProvider>
  );
}
