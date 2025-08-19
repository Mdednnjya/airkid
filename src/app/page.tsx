import Header from "@/components/footer";
import Footer from "@/components/header";
import { getAuth } from "firebase/auth";

export default function landingPage() {

    return (
        <>
        <Header/>
            <main>
                <p>
                    This is main
                </p>
            </main>
        <Footer/>
        </>
    );
}