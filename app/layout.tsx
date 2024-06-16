import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Header from "../components/Header";
import LoaderProvider from "../components/LoaderProvider";
import SplashScreen from "../components/SplashScreen";

import { Toaster } from "sonner";
import {BlockChainProvider} from '@/context/BlockChainContext'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "HashiRWA",
	description: "Lending Protocol",
	icons:"/logo.svg"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {


	return (
		<html lang="en">
			<BlockChainProvider>
					<body className={inter.className+"  gradient flex flex-col items-center"}>
						<Toaster
							position="top-center"
							toastOptions={{
								classNames: {
									success: "bg-green-400 text-white",
									error: "bg-red-500 text-white",
								},
							}}
						/>
						{/* <SplashScreen/> */}
						<Header />
						<LoaderProvider>
							{children}
						</LoaderProvider>
					</body>
			</BlockChainProvider>
		</html>
	);
}
