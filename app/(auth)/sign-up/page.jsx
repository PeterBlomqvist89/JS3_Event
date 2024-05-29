import Link from "next/link"
import SignUpForm from "../_components/sign-up-form"

function SignUpPage() {
  return (
    <div>
        <h1 className="text-6xl font-bold flex justify-center py-14">Create an account</h1>
        <SignUpForm />
        <p className="mt-6 text-center">Already have an account? <Link className="text-blue-500 underline" href='/sign-in'>Login</Link> instead</p>
    </div>
  )
}
export default SignUpPage