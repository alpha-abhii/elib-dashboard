import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/http/api"
import { useMutation } from "@tanstack/react-query"
import { LoaderCircle } from "lucide-react"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function LoginPage() {
    const navigate = useNavigate()

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            // Invalidate and refetch
            console.log("Login Successful")
            navigate('/dashboard/home')
        },
    })

    const handleLoginSubmit = () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if(!email || !password) {
            return alert("Please enter email and password");
        }

        mutation.mutate({email,password})



        // console.log("data:", email, password)
    }



    return (
        <div className="h-screen w-full flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                        {mutation.isError && (
                            <span className="text-red-500 text-sm">{'Something went wrong'}</span>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input ref={emailRef} id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input ref={passwordRef} id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button onClick={handleLoginSubmit} className="w-full" disabled={mutation.isPending}>
                        {
                            mutation.isPending && <LoaderCircle className="animate-spin"/>
                        }
                        <span className="ml-2">Sign in</span>
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link to={'/auth/register'} className="underline">
                            Sign Up
                        </Link>
                    </div>
                </CardFooter>

            </Card>
        </div>
    )
}