import { FC, useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WebAppSDK from '@twa-dev/sdk'

import s from './modal.module.scss'

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    buttonClass?: string;
    isCloseButton?: boolean;
}

export const Modal: FC<ModalProps> = ({ children, onClose, isOpen, className, buttonClass, isCloseButton = true }) => {
    const TgObj = WebAppSDK
    const modalRef = useRef<HTMLDivElement | null>(null)
    const [ isClosing, setIsClosing ] = useState<boolean>(false)

    const handleCloseModal = () => {
        TgObj.HapticFeedback.impactOccurred('medium')
        setIsClosing(true)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node) && isClosing) {
                handleCloseModal()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ isOpen, onClose, isClosing ])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [ isOpen ])

    return (
        <AnimatePresence onExitComplete={onClose}>
            {isOpen && (
                <motion.div
                    className={s.modalBackdrop}
                    transition={{
                        duration: 0.3,
                        bounce: 0
                    }}
                >
                    <motion.div
                        className={`${s.modalContent} ${className || ''}`}
                        ref={modalRef}
                        initial={{ y: '100%' }}
                        animate={{ y: 0  }}
                        exit={{ y: '100%' }}
                        transition={{
                            duration: 0.3,
                            bounce: 0,
                            type: 'spring'
                        }}
                    >
                        {isCloseButton && (
                            <button className={`${s.closeButton} ${buttonClass || ''}`} onClick={handleCloseModal}>
                                &times;
                            </button>
                        )}
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
