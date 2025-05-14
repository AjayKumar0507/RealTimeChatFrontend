import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


const apiURL = process.env.REACT_APP_API_URL;
const wsURL = process.env.REACT_APP_WS_URL;

// Define schemas for forms
const registerSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});


const loginSchema = z.object({
  username: z.string().min(2,"Please enter a valid user id"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional()
});

export default function AuthPage() {
  const [location, navigate] = useLocation();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState({ login: false, register: false });
  const navigates = useNavigate();
  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  // Register form
  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      terms: false
    },
  });

  // Login form
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false
    },
  });

  // Handle registration
  const onRegisterSubmit = async (data) => {
    setIsLoading({ ...isLoading, register: true });
    setError("");
    try {
      await axios.post(`${apiURL}/auth/register`, {
        username: data.username, // Using email as username
        password: data.password,
        email: data.email
      });
      
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    } finally {
      setIsLoading({ ...isLoading, register: false });
    }
  };

  // Handle login
  const onLoginSubmit = async (data) => {
    setIsLoading({ ...isLoading, login: true });
    setError("");
    try {
      const response = await axios.post(`${apiURL}/auth/login`, {
        username: data.username,
        password: data.password,
      });
      // Assuming response.data is { token: string, user: { username: string, name: string, avatar: string } }
      const token  = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({
        username: data.username,
        password: data.password
      }));

      navigates("/chat");
    } catch (err) {
      setError(err.response?.data || "Invalid credentials");
    } finally {
      setIsLoading({ ...isLoading, login: false });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
          {/* Left side - Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              {/* Login Tab Content */}
              <TabsContent value="login">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
                  <p className="text-gray-500 mt-2">Log in to your ChatWave account</p>
                </div>
                
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User Id</FormLabel>
                          <FormControl>
                            <Input placeholder="JohnDoe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex items-center justify-between">
                      <FormField
                        control={loginForm.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm text-gray-500 cursor-pointer">
                              Remember me
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full gradient-bg hover:shadow-lg"
                      disabled={isLoading.login}
                    >
                      {isLoading.login ? "Logging in..." : "Log in"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              {/* Register Tab Content */}
              <TabsContent value="register">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
                  <p className="text-gray-500 mt-2">Join thousands of teams using ChatWave</p>
                </div>
                
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="john@example.com" 
                              {...field} 
                              onChange={(e) => {
                                field.onChange(e);
                                registerForm.setValue("username", e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-gray-500">
                              I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full gradient-bg hover:shadow-lg"
                      disabled={isLoading.register}
                    >
                      {isLoading.register ? "Creating account..." : "Create account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right side - Hero */}
          <div className="hidden md:flex flex-col justify-center p-8">
            <h1 className="text-4xl font-bold text-gray-900">
              Connect <span className="text-primary">instantly</span><br />
              with your team
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              ChatWave brings your conversations to life with seamless
              messaging, voice calls, and collaborative features in one
              beautiful app.
            </p>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956" 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                />
              </div>
              <span className="ml-4 text-sm text-gray-500">
                <span className="font-semibold">5,000+</span> teams already joined
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}