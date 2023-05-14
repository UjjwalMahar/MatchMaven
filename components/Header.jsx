import { db } from "@/firebaseClient"
import { collection, doc, getDocs, onSnapshot, query, setDoc } from "firebase/firestore"
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { ArrowPathIcon, Bars3Icon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, XMarkIcon, } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Modal from 'react-modal';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-40%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#Afd3e2'
    },
};


const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const { user, loginWithGoogle, logout } = useAuth()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [sendRequests, setSendRequests] = useState();
    const getSendRequestData = (user) => {
        const q = query(collection(db, `users/${user.uid}/send_request`));
        return onSnapshot(q, (querySnapshot) => {
            const sendRequestsList = [];
            querySnapshot.forEach((doc) => {
                sendRequestsList.push(doc.data());
            });
            setSendRequests(sendRequestsList);
        });
    };

    useEffect(() => {
        if (user) {
            const unsubscribe = getSendRequestData(user);
            return () => unsubscribe();
        }
    }, [user]);


    const [recieveRequests, setRecieveRequests] = useState();
    const getRecieveRequestData = (user) => {
        const q = collection(db, `users/${user.uid}/recieved_request`);
        return onSnapshot(q, (querySnapshot) => {
            const recieveRequestsList = [];
            querySnapshot.forEach((doc) => {
                recieveRequestsList.push(doc.data());
            });
            setRecieveRequests(recieveRequestsList);
        });
    };

    useEffect(() => {
        if (user) {
            const unsubscribe = getRecieveRequestData(user);
            return () => unsubscribe();
        }
    }, [user]);

    return (
        <>
            <header className="sticky z-10 p-6">
                <nav className="mx-auto flex items-center justify-between py-6" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                        <h1 className="text-2xl font-semibold">MatchMaven</h1>
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <Popover.Group className="hidden lg:flex lg:gap-x-12">
                        {user && <Link href="/sendRequests" className="text-sm font-semibold leading-6 text-gray-900 relative">
                            All Sended Requests
                            {sendRequests && sendRequests.length > 0 && (
                                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center absolute top-0 right-0 -mt-1 -mr-4">
                                    {sendRequests.length}
                                </span>
                            )}
                        </Link>}
                        {user && <Link href="/recieveRequests" className="text-sm font-semibold leading-6 text-gray-900 relative">
                            All Recieved Requests
                            {recieveRequests && recieveRequests.length > 0 && (
                                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center absolute top-0 right-0 -mt-1 -mr-4">
                                    {recieveRequests.length}
                                </span>
                            )}
                        </Link>}
                        {user && <Link href="/adminpannel" className="text-sm font-semibold leading-6 text-gray-900">
                            My DashBoard
                        </Link>}
                        {user && <Link href="/chats" className="text-sm font-semibold leading-6 text-gray-900">
                            My Chats
                        </Link>}
                    </Popover.Group>
                        
                    <div className='space-x-4 hidden lg:flex lg:flex-1 lg:justify-end items-center justify-center'>
                        {user ? <div className="flex items-center">
  <img
    className="w-8 h-8 rounded-full mr-2"
    src={user?.photoURL}
    alt={user?.displayName}
  />

</div>
 :
                            <button onClick={openModal} class="group flex w-full items-center justify-center rounded-md bg-black text-base hover:bg-white hover:text-black px-5 py-3 text-white transition sm:mt-0 sm:w-auto focus:outline-none">
                                <span class="text-sm font-medium"> Login </span>
                                <svg class="group-hover:translate-x-2 ml-3 h-5 w-5 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        }
                             {user &&
                            <button onClick={logout} class="group  flex w-full items-center justify-center rounded-md bg-cyan-500 hover:bg-cyan-600 px-5 py-3 text-white transition sm:mt-0 sm:w-auto focus:outline-none">
                                        <span class="text-sm font-medium"> Logout</span>
                                <svg class="group-hover:translate-x-2 ml-3 h-5 w-5 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        }
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-10" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="-m-1.5 p-1.5">
                            <h1 className="text-2xl font-semibold">MatchMaven</h1>
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {user && <Link
                                        href="/company"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Send Requests
                                    </Link> }  
                                    {user && <Link
                                        href="/company"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Recieved Requests
                                    </Link>  } 
                                    {user && <Link
                                        href="/company"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        My Chats
                                    </Link>}
                                    
                                    <button onClick={()=> loginWithGoogle()} class="group flex items-center justify-center rounded-md bg-black text-white text-base hover:bg-white px-5 py-3 hover:text-black transition sm:mt-0 sm:w-auto focus:outline-none hover:border">
                                <span class="text-sm font-medium"> Login </span>
                                <svg class="group-hover:translate-x-2 ml-3 h-5 w-5 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                                </div>
                                  
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
                    <p className="text-center text-3xl font-bold md:text-left md:leading-tight">Welcome to MatchMaven</p>
                    <button onClick={() => { loginWithGoogle(); closeModal(); }} className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-2 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent bg-white text-black font-semibold hover:text-white hover:bg-black "><img className="mr-2 h-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcIFnSSCcbH_MmKhlhnTBW2tjOyMTcThEUcg&usqp=CAU" alt /> Get started with Google</button>
                    <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
                        <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">Or use email instead</div>
                    </div>
                    <form className="flex flex-col items-stretch pt-3 md:pt-8">
                        <div className="flex flex-col pt-4">
                            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                <input type="text" id="login-name" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none border" placeholder="Name" />
                            </div>
                        </div>
                        <div className="flex flex-col pt-4">
                            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                <input type="email" id="login-email" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none border" placeholder="Email" />
                            </div>
                        </div>
                        <div className="mb-4 flex flex-col pt-4">
                            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                <input type="password" id="login-password" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none border" placeholder="Password (minimum 8 characters)" />
                            </div>
                        </div>

                        <button type="submit" className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32">Sign in</button>
                    </form>
                </div>
            </Modal>
        </>
    )
}
