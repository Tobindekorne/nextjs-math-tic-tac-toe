import { useRecoilState } from 'recoil';
import { Dialog, Transition } from '@headlessui/react';
import { modalState } from '../atoms/modalAtom';
import { Fragment } from 'react';
import styles from './Modal.module.css';

const Modal = () => {
    const [open, setOpen] = useRecoilState(modalState);
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as='div'
                className='fixed inset-0 z-10 overflow-y-auto'
                onClose={() => setOpen(false)}
            >
                <div className='flex min-h-[800px] items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='bg-gray500 fixed inset-0 bg-opacity-75 transition-opacity' />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents */}
                    <span
                        className='hidden sm:inline-block sm:h-screen sm:align-middle'
                        aria-hidden='true'
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <div
                            className={`inline-block ${styles.modal} transform overflow-hidden rounded-lg px-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle`}
                        >
                            <div>
                                <div>
                                    <div className='mt-3 text-center sm:mt-5'>
                                        <Dialog.Title
                                            as='h3'
                                            className={`${styles.modalHeading} font-medium leading-6 text-white`}
                                        >
                                            Formatting Tips
                                        </Dialog.Title>
                                    </div>

                                    <div>
                                        <ul className={`${styles.listGroup}`}>
                                            <li
                                                className={`${styles.listGroupItem}`}
                                            >
                                                Wrap all expressions you want to
                                                show up mathematically in <br />
                                                <code
                                                    className={`${styles.inlineMathCode}`}
                                                >
                                                    $
                                                </code>{' '}
                                                and{' '}
                                                <code
                                                    className={`${styles.inlineMathCode}`}
                                                >
                                                    $
                                                </code>
                                            </li>
                                            <li
                                                className={`${styles.listGroupItem}`}
                                            >
                                                To display a fraction like one
                                                half use the notation{' '}
                                                <code
                                                    className={`${styles.mathCode}`}
                                                >
                                                    $ 1 \over 2 $
                                                </code>
                                            </li>
                                            <li
                                                className={`${styles.listGroupItem}`}
                                            >
                                                To make a square root use{' '}
                                                <code
                                                    className={`${styles.mathCode}`}
                                                >
                                                    $ \sqrt{'{x}'} $
                                                </code>
                                            </li>
                                            <li
                                                className={`${styles.listGroupItem}`}
                                            >
                                                To make any other root use
                                                square braces with the root for
                                                example, cube root would look
                                                like{' '}
                                                <code
                                                    className={`${styles.mathCode}`}
                                                >
                                                    $ \sqrt[3]{'{x}'} $
                                                </code>
                                            </li>
                                            <li
                                                className={`${styles.listGroupItem}`}
                                            >
                                                To raise anything to a power use
                                                the carot symbol:{''}
                                                <code
                                                    className={`${styles.mathCode}`}
                                                >
                                                    $ x^2 $
                                                </code>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Modal;
