import Link from "next/link"
import SignInForm from "../_components/sign-in-form"

function SignInPage() {
  return (
    <div>
        <h1 className="text-6xl font-bold flex justify-center py-14">Login to your account</h1>
        <SignInForm />
        <p className="mt-6 text-center">Don't have an account? <Link className="text-blue-500 underline" href='/sign-up'>Register</Link> instead</p>
        
    </div>
  )
}
export default SignInPage
