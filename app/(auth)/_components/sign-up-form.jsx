"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore"
import {  auth, db } from '@/firebase/config';
import toast from 'react-hot-toast';


const formSchema = z.object({
  email: z.string().email({ message: "You need to enter a valid email."}),
  firstName: z.string().min(1, { message: "You need to enter a first name."}),
  lastName: z.string().min(1, { message: "You need to enter a last name."}),
  password: z.string().min(8, { message: "The password must be at least 8 characters long."}),
  confirmPassword: z.string(),
}).refine(values => {
    return values.password === values.confirmPassword
}, {
    message: 'Passwords must match',
    path: ['confirmPassword']
})

const SignUpForm = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values) {
        try {
          // Skapa användare med Firebase Authentication
          const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
          const user = userCredential.user;
          console.log("User created: ", user);

          // Lägga till användardata i Firestore med rollen 'user'
          await addDoc(collection(db, "users"), {
            uid: user.uid,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            role: "user" // Tilldela standardrollen 'user'
          });

          console.log("User added to Firestore with ID: ", user.uid);
          toast.success('Registreringen lyckades!');
        } catch (error) {
          console.error("Error creating user: ", error);
          toast.error('Något gick fel vid registreringen.');
        }
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 border rounded-md">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                  <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                  <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                  <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default SignUpForm
